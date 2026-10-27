// Use TMDB’s version-three API as the server’s upstream service.
const apiUrl = 'https://api.themoviedb.org/3';
// Use TMDB’s image host to construct poster and backdrop URLs.
const imageUrl = 'https://image.tmdb.org/t/p';

// Return JSON with an HTTP status; cache successful responses for five minutes only.
function json(data, status = 200) {
  // Send the JSON body with its status and cache policy.
  return Response.json(data, { status, headers: { 'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store' } });
}

// Validate a movie request and return normalized details from TMDB.
export async function handleMovie(request, token, fetcher = fetch) {
  // Accept read requests only.
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET' } });

  // Read the movie ID needed by this request.
  const id = new URL(request.url).searchParams.get('id') || '';
  // Reject malformed or excessively long movie IDs.
  if (!/^[1-9]\d{0,9}$/.test(id)) return json({ error: 'Invalid movie ID.' }, 400);
  // Stop early when the server has no TMDB credential configured.
  if (!token?.trim()) return json({ error: 'Movie service is not configured.', code: 'NOT_CONFIGURED' }, 503);

  // Combine cancellation with a timeout so requests cannot wait forever.
  const signal = AbortSignal.any([request.signal, AbortSignal.timeout(10000)]);
  // Attempt this operation and handle failures in the catch block.
  try {
    // Wait for the upstream HTTP response.
    const response = await fetcher(`${apiUrl}/movie/${id}?language=en-US&append_to_response=credits`, {
      // Set headers.
      headers: { Authorization: `Bearer ${token.trim()}`, accept: 'application/json' }, signal,
    });
    // Check response.status === 404 before running this branch.
    if (response.status === 404) return json({ error: 'Movie not found.' }, 404);
    // Treat an unsuccessful HTTP response as a request failure.
    if (!response.ok) return json({ error: 'Unable to load movie details right now.' }, 502);

    // Read the movie details returned by TMDB.
    const movie = await response.json();
    // Require a valid movie object and numeric ID before using its fields.
    if (!movie || !Number.isInteger(movie.id)) return json({ error: 'Unable to load movie details right now.' }, 502);

    // Return only the normalized movie fields the details page needs.
    return json({ movie: {
      // Set id.
      id: movie.id,
      // Set title, including a fallback when the source value is unavailable.
      title: movie.title || movie.original_title || 'Untitled',
      // Set original title, including a fallback when the source value is unavailable.
      originalTitle: movie.original_title || '',
      // Set description, including a fallback when the source value is unavailable.
      description: movie.overview || '',
      // Set tagline, including a fallback when the source value is unavailable.
      tagline: movie.tagline || '',
      // Set release date, including a fallback when the source value is unavailable.
      releaseDate: movie.release_date || null,
      // Set year, including a fallback when the source value is unavailable.
      year: movie.release_date?.slice(0, 4) || null,
      // Set runtime, including a fallback when the source value is unavailable.
      runtime: movie.runtime > 0 ? movie.runtime : null,
      // Set rating, including a fallback when the source value is unavailable.
      rating: movie.vote_count > 0 && Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : null,
      // Set genres, including a fallback when the source value is unavailable.
      genres: (movie.genres || []).map((genre) => genre.name).filter(Boolean),
      // Set poster, including a fallback when the source value is unavailable.
      poster: movie.poster_path ? `${imageUrl}/w500${movie.poster_path}` : null,
      // Set backdrop, including a fallback when the source value is unavailable.
      backdrop: movie.backdrop_path ? `${imageUrl}/w1280${movie.backdrop_path}` : null,
      // Set directors, including a fallback when the source value is unavailable.
      directors: (movie.credits?.crew || []).filter((person) => person.job === 'Director').map((person) => person.name),
      // Set languages, including a fallback when the source value is unavailable.
      languages: (movie.spoken_languages || []).map((language) => language.english_name || language.name).filter(Boolean),
      // Set countries, including a fallback when the source value is unavailable.
      countries: (movie.production_countries || []).map((country) => country.name).filter(Boolean),
      // Set status, including a fallback when the source value is unavailable.
      status: movie.status || '',
    } });
  } catch {
    // Return a readable error and the corresponding HTTP status.
    return json({ error: 'Unable to reach the movie service. Please try again.' }, signal.aborted ? 504 : 502);
  }
}
