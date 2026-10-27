// Use TMDB’s version-three API as the server’s upstream service.
const apiUrl = 'https://api.themoviedb.org/3';
// Use TMDB’s image host to construct poster and backdrop URLs.
const imageUrl = 'https://image.tmdb.org/t/p';
// Map public category names to TMDB endpoint paths.
const categories = {
  // Set popular.
  popular: '/movie/popular',
  // Set 'top rated'.
  'top-rated': '/movie/top_rated',
  // Set 'now playing'.
  'now-playing': '/movie/now_playing',
  // Set upcoming.
  upcoming: '/movie/upcoming',
  // Set trending.
  trending: '/trending/movie',
};

// Return JSON with an HTTP status; cache successful responses for five minutes only.
function json(data, status = 200) {
  // Send the JSON body with its status and cache policy.
  return Response.json(data, {
    status,
    // Set headers, including a fallback when the source value is unavailable.
    headers: { 'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store' },
  });
}

// Validate browse filters and combine TMDB movies with their genre names.
export async function handleMovies(request, token, fetcher = fetch) {
  // Accept read requests only.
  if (request.method !== 'GET') {
    // Reject unsupported methods and advertise GET as the allowed method.
    return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  }

  // Stop early when the server has no TMDB credential configured.
  if (!token?.trim()) {
    // Return a readable error and the corresponding HTTP status.
    return json({ error: 'Movie service is not configured.', code: 'NOT_CONFIGURED' }, 503);
  }

  // Read the parameters supplied in the request URL.
  const search = new URL(request.url).searchParams;
  // Read the movie search text, using an empty string when it is missing.
  const query = search.get('q')?.trim() || '';
  // Choose a supported movie category, falling back to Popular.
  const category = search.get('category') || 'popular';
  // Read the selected genre and reject invalid genre IDs.
  const genre = search.get('genre') || '';
  // Choose the daily or weekly trending results.
  const timeWindow = search.get('window') || 'week';
  // Reject search text longer than the supported 100 characters.
  if (query.length > 100) return json({ error: 'Search must be 100 characters or fewer.' }, 400);
  // Reject unknown categories instead of forwarding arbitrary endpoint names.
  if (!Object.hasOwn(categories, category)) return json({ error: 'Invalid movie category.' }, 400);
  // Require a positive numeric genre ID before contacting TMDB.
  if (genre && !/^[1-9]\d{0,4}$/.test(genre)) return json({ error: 'Invalid genre.' }, 400);
  // Accept only the daily and weekly trending periods.
  if (!['day', 'week'].includes(timeWindow)) return json({ error: 'Invalid trending window.' }, 400);

  // Build URL parameters without manual escaping.
  const params = new URLSearchParams({ language: 'en-US', page: '1', include_adult: 'false' });
  // Check query before running this branch.
  if (query) params.set('query', query);
  else if (genre) {
    // Update the URL parameters sent with the movie request.
    params.set('with_genres', genre);
    // Update the URL parameters sent with the movie request.
    params.set('sort_by', 'popularity.desc');
    // Update the URL parameters sent with the movie request.
    params.set('include_video', 'false');
  }
  // Choose search, genre discovery, trending or the selected category endpoint.
  const endpoint = query ? '/search/movie' : genre ? '/discover/movie' : category === 'trending' ? `/trending/movie/${timeWindow}` : categories[category];

  // Combine cancellation with a timeout so requests cannot wait forever.
  const signal = AbortSignal.any([request.signal, AbortSignal.timeout(10000)]);
  // Send the server-only bearer token and cancellation signal with TMDB requests.
  const options = { headers: { Authorization: `Bearer ${token.trim()}`, accept: 'application/json' }, signal };

  // Attempt this operation and handle failures in the catch block.
  try {
    // Wait for the independent requests together.
    const responses = await Promise.all([
      fetcher(`${apiUrl}${endpoint}?${params}`, options),
      fetcher(`${apiUrl}/genre/movie/list?language=en-US`, options),
    ]);
    // Treat an unsuccessful HTTP response as a request failure.
    if (responses.some((response) => !response.ok)) {
      // Return a readable error and the corresponding HTTP status.
      return json({ error: 'Unable to load movies right now.' }, 502);
    }

    // Wait for the independent requests together.
    const [catalogue, genreList] = await Promise.all(responses.map((response) => response.json()));
    // Check !Array.isArray(catalogue.results) || !Array.isArray(genreList.genres) before running this branch.
    if (!Array.isArray(catalogue.results) || !Array.isArray(genreList.genres)) {
      // Return a readable error and the corresponding HTTP status.
      return json({ error: 'Unable to load movies right now.' }, 502);
    }

    // Keep only genres with a valid numeric ID and a text name.
    const availableGenres = genreList.genres.filter((genre) => Number.isInteger(genre.id) && typeof genre.name === 'string');
    // Look up readable genre names by their numeric IDs.
    const genres = new Map(availableGenres.map((genre) => [genre.id, genre.name]));
    // Check !query && genre && !genres.has(Number(genre)) before running this branch.
    if (!query && genre && !genres.has(Number(genre))) return json({ error: 'Invalid genre.' }, 400);
    // Normalize TMDB results into the fields used by movie cards.
    const movies = catalogue.results.filter((movie) => Number.isInteger(movie.id)).map((movie) => ({
      // Set id.
      id: movie.id,
      // Set title, including a fallback when the source value is unavailable.
      title: movie.title || movie.original_title || 'Untitled',
      // Set description, including a fallback when the source value is unavailable.
      description: movie.overview || '',
      // Set release date, including a fallback when the source value is unavailable.
      releaseDate: movie.release_date || null,
      // Set year, including a fallback when the source value is unavailable.
      year: movie.release_date?.slice(0, 4) || null,
      // Set rating, including a fallback when the source value is unavailable.
      rating: movie.vote_count > 0 && Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : null,
      // Set genre, including a fallback when the source value is unavailable.
      genre: (movie.genre_ids || []).map((id) => genres.get(id)).filter(Boolean).join(', '),
      // Set poster, including a fallback when the source value is unavailable.
      poster: movie.poster_path ? `${imageUrl}/w500${movie.poster_path}` : null,
      // Set backdrop, including a fallback when the source value is unavailable.
      backdrop: movie.backdrop_path ? `${imageUrl}/w1280${movie.backdrop_path}` : null,
    }));

    // Return only the normalized movie fields the details page needs.
    return json({ movies, genres: availableGenres });
  } catch {
    // Return a readable error and the corresponding HTTP status.
    return json({ error: 'Unable to reach the movie service. Please try again.' }, signal.aborted ? 504 : 502);
  }
}
