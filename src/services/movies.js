// Import { fetchJson } from ./fetchJson.js.
import { fetchJson } from './fetchJson.js';

// Build the list request from the chosen search or browse filters.
export async function getMovies(query, signal, { category = 'popular', genre = '', timeWindow = 'week' } = {}) {
  // Build URL parameters without manual escaping.
  const params = new URLSearchParams();
  // Check query before running this branch.
  if (query) params.set('q', query);
  else if (genre) params.set('genre', genre);
  else {
    // Check category !== 'popular' before running this branch.
    if (category !== 'popular') params.set('category', category);
    // Check category === 'trending' before running this branch.
    if (category === 'trending') params.set('window', timeWindow);
  }
  // Create the URL for our server’s movie endpoint.
  const url = '/api/movies' + (params.size ? `?${params}` : '');
  // Use one readable message for network or malformed-response failures.
  const errorMessage = 'We couldn’t load movies. Check your connection and try again.';
  // Wait for the validated JSON response.
  const data = await fetchJson(url, { signal, errorMessage });
  // Check !Array.isArray(data?.movies) before running this branch.
  if (!Array.isArray(data?.movies)) throw new Error(errorMessage);
  // Return the validated values for the caller to use.
  return { movies: data.movies, genres: Array.isArray(data.genres) ? data.genres : [] };
}
