export async function getMovies(query, signal) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  const url = '/api/movies' + (params.size ? `?${params}` : '');
  const response = await fetch(url, { signal, headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error('We couldn’t load movies. Please try again.');
  const data = await response.json();
  if (!Array.isArray(data.movies)) throw new Error('We couldn’t load movies. Please try again.');
  return data.movies;
}
