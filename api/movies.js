// Import { handleMovies } from ../server/movies.js.
import { handleMovies } from '../server/movies.js';

export default {
  fetch(request) {
    // Return handleMovies(request, process.env.TMDB_READ_TOKEN).
    return handleMovies(request, process.env.TMDB_READ_TOKEN);
  },
};
