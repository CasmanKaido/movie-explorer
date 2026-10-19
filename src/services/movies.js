export async function getMovies(signal) {
  const response = await fetch('/api/movies', { signal, headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error('We couldn’t load movies. Please try again.');
  const data = await response.json();
  if (!Array.isArray(data.movies)) throw new Error('We couldn’t load movies. Please try again.');
  return data.movies;
}
