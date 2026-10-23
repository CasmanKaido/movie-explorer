import { fetchJson } from './fetchJson.js';

export async function getMovie(id, signal) {
  const errorMessage = 'We couldn’t load this movie. Check your connection and try again.';
  const data = await fetchJson('/api/movie?' + new URLSearchParams({ id }), {
    signal, errorMessage, notFoundMessage: 'Movie not found.',
  });
  if (!data?.movie || data.movie.id == null) throw new Error(errorMessage);
  return data.movie;
}
