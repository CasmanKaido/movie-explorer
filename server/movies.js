const apiUrl = 'https://api.themoviedb.org/3';
const imageUrl = 'https://image.tmdb.org/t/p';
const categories = {
  popular: '/movie/popular',
  'top-rated': '/movie/top_rated',
  'now-playing': '/movie/now_playing',
  upcoming: '/movie/upcoming',
  trending: '/trending/movie',
};

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store' },
  });
}

export async function handleMovies(request, token, fetcher = fetch) {
  if (request.method !== 'GET') {
    return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  }

  if (!token?.trim()) {
    return json({ error: 'Movie service is not configured.', code: 'NOT_CONFIGURED' }, 503);
  }

  const search = new URL(request.url).searchParams;
  const query = search.get('q')?.trim() || '';
  const category = search.get('category') || 'popular';
  const genre = search.get('genre') || '';
  const timeWindow = search.get('window') || 'week';
  if (query.length > 100) return json({ error: 'Search must be 100 characters or fewer.' }, 400);
  if (!Object.hasOwn(categories, category)) return json({ error: 'Invalid movie category.' }, 400);
  if (genre && !/^[1-9]\d{0,4}$/.test(genre)) return json({ error: 'Invalid genre.' }, 400);
  if (!['day', 'week'].includes(timeWindow)) return json({ error: 'Invalid trending window.' }, 400);

  const params = new URLSearchParams({ language: 'en-US', page: '1', include_adult: 'false' });
  if (query) params.set('query', query);
  else if (genre) {
    params.set('with_genres', genre);
    params.set('sort_by', 'popularity.desc');
    params.set('include_video', 'false');
  }
  const endpoint = query ? '/search/movie' : genre ? '/discover/movie' : category === 'trending' ? `/trending/movie/${timeWindow}` : categories[category];

  const signal = AbortSignal.any([request.signal, AbortSignal.timeout(10000)]);
  const options = { headers: { Authorization: `Bearer ${token.trim()}`, accept: 'application/json' }, signal };

  try {
    const responses = await Promise.all([
      fetcher(`${apiUrl}${endpoint}?${params}`, options),
      fetcher(`${apiUrl}/genre/movie/list?language=en-US`, options),
    ]);
    if (responses.some((response) => !response.ok)) {
      return json({ error: 'Unable to load movies right now.' }, 502);
    }

    const [catalogue, genreList] = await Promise.all(responses.map((response) => response.json()));
    if (!Array.isArray(catalogue.results) || !Array.isArray(genreList.genres)) {
      return json({ error: 'Unable to load movies right now.' }, 502);
    }

    const availableGenres = genreList.genres.filter((genre) => Number.isInteger(genre.id) && typeof genre.name === 'string');
    const genres = new Map(availableGenres.map((genre) => [genre.id, genre.name]));
    if (!query && genre && !genres.has(Number(genre))) return json({ error: 'Invalid genre.' }, 400);
    const movies = catalogue.results.filter((movie) => Number.isInteger(movie.id)).map((movie) => ({
      id: movie.id,
      title: movie.title || movie.original_title || 'Untitled',
      description: movie.overview || '',
      releaseDate: movie.release_date || null,
      year: movie.release_date?.slice(0, 4) || null,
      rating: movie.vote_count > 0 && Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : null,
      genre: (movie.genre_ids || []).map((id) => genres.get(id)).filter(Boolean).join(', '),
      poster: movie.poster_path ? `${imageUrl}/w500${movie.poster_path}` : null,
      backdrop: movie.backdrop_path ? `${imageUrl}/w1280${movie.backdrop_path}` : null,
    }));

    return json({ movies, genres: availableGenres });
  } catch {
    return json({ error: 'Unable to reach the movie service. Please try again.' }, signal.aborted ? 504 : 502);
  }
}
