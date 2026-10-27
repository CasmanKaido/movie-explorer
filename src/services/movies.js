import { fetchJson } from './fetchJson.js';

export async function getMovies(query, signal, { category = 'popular', genre = '', timeWindow = 'week' } = {}) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  else if (genre) params.set('genre', genre);
  else {
    if (category !== 'popular') params.set('category', category);
    if (category === 'trending') params.set('window', timeWindow);
  }
  const url = '/api/movies' + (params.size ? `?${params}` : '');
  const errorMessage = 'We couldn’t load movies. Check your connection and try again.';
  const data = await fetchJson(url, { signal, errorMessage });
  if (!Array.isArray(data?.movies)) throw new Error(errorMessage);
  return { movies: data.movies, genres: Array.isArray(data.genres) ? data.genres : [] };
}
