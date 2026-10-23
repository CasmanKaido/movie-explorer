import { fetchJson } from './fetchJson.js';

export async function getMovies(query, signal) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  const url = '/api/movies' + (params.size ? `?${params}` : '');
  const errorMessage = 'We couldn’t load movies. Check your connection and try again.';
  const data = await fetchJson(url, { signal, errorMessage });
  if (!Array.isArray(data?.movies)) throw new Error(errorMessage);
  return data.movies;
}
