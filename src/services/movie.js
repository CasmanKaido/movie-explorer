export async function getMovie(id, signal) {
  const response = await fetch('/api/movie?' + new URLSearchParams({ id }), {
    signal, headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    const error = new Error(response.status === 404 || response.status === 400 ? 'Movie not found.' : 'We couldn’t load this movie. Please try again.');
    error.notFound = response.status === 404 || response.status === 400;
    throw error;
  }
  const data = await response.json();
  if (!data.movie || data.movie.id == null) throw new Error('We couldn’t load this movie. Please try again.');
  return data.movie;
}
