// Import { fetchJson } from ./fetchJson.js.
import { fetchJson } from './fetchJson.js';

// Request details through our server endpoint so the TMDB token stays private.
export async function getMovie(id, signal) {
  // Use one readable message for network or malformed-response failures.
  const errorMessage = 'We couldn’t load this movie. Check your connection and try again.';
  // Wait for the validated JSON response.
  const data = await fetchJson('/api/movie?' + new URLSearchParams({ id }), {
    signal, errorMessage, notFoundMessage: 'Movie not found.',
  });
  // Check !data?.movie || data.movie.id == null before running this branch.
  if (!data?.movie || data.movie.id == null) throw new Error(errorMessage);
  // Return data.movie.
  return data.movie;
}
