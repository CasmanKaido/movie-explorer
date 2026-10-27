// Import { handleMovie } from ../server/movie.js.
import { handleMovie } from '../server/movie.js';

export default {
  fetch(request) {
    // Return handleMovie(request, process.env.TMDB_READ_TOKEN).
    return handleMovie(request, process.env.TMDB_READ_TOKEN);
  },
};
