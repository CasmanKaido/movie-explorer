const apiUrl = 'https://api.themoviedb.org/3';
const imageUrl = 'https://image.tmdb.org/t/p';

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

  const query = new URL(request.url).searchParams.get('q')?.trim() || '';
  if (query.length > 100) return json({ error: 'Search must be 100 characters or fewer.' }, 400);

  const params = new URLSearchParams({ language: 'en-US', page: '1', include_adult: 'false' });
  if (query) params.set('query', query);
  const endpoint = query ? '/search/movie' : '/movie/popular';

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

    const genres = new Map(genreList.genres.map((genre) => [genre.id, genre.name]));
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

    return json({ movies });
  } catch {
    return json({ error: 'Unable to reach the movie service. Please try again.' }, signal.aborted ? 504 : 502);
  }
}
