const apiUrl = 'https://api.themoviedb.org/3';
const imageUrl = 'https://image.tmdb.org/t/p';

function json(data, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store' } });
}

export async function handleMovie(request, token, fetcher = fetch) {
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET' } });

  const id = new URL(request.url).searchParams.get('id') || '';
  if (!/^[1-9]\d{0,9}$/.test(id)) return json({ error: 'Invalid movie ID.' }, 400);
  if (!token?.trim()) return json({ error: 'Movie service is not configured.', code: 'NOT_CONFIGURED' }, 503);

  const signal = AbortSignal.any([request.signal, AbortSignal.timeout(10000)]);
  try {
    const response = await fetcher(`${apiUrl}/movie/${id}?language=en-US&append_to_response=credits`, {
      headers: { Authorization: `Bearer ${token.trim()}`, accept: 'application/json' }, signal,
    });
    if (response.status === 404) return json({ error: 'Movie not found.' }, 404);
    if (!response.ok) return json({ error: 'Unable to load movie details right now.' }, 502);

    const movie = await response.json();
    if (!movie || !Number.isInteger(movie.id)) return json({ error: 'Unable to load movie details right now.' }, 502);

    return json({ movie: {
      id: movie.id,
      title: movie.title || movie.original_title || 'Untitled',
      originalTitle: movie.original_title || '',
      description: movie.overview || '',
      tagline: movie.tagline || '',
      releaseDate: movie.release_date || null,
      year: movie.release_date?.slice(0, 4) || null,
      runtime: movie.runtime > 0 ? movie.runtime : null,
      rating: movie.vote_count > 0 && Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : null,
      genres: (movie.genres || []).map((genre) => genre.name).filter(Boolean),
      poster: movie.poster_path ? `${imageUrl}/w500${movie.poster_path}` : null,
      backdrop: movie.backdrop_path ? `${imageUrl}/w1280${movie.backdrop_path}` : null,
      directors: (movie.credits?.crew || []).filter((person) => person.job === 'Director').map((person) => person.name),
      languages: (movie.spoken_languages || []).map((language) => language.english_name || language.name).filter(Boolean),
      countries: (movie.production_countries || []).map((country) => country.name).filter(Boolean),
      status: movie.status || '',
    } });
  } catch {
    return json({ error: 'Unable to reach the movie service. Please try again.' }, signal.aborted ? 504 : 502);
  }
}
