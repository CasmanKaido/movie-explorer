import { handleMovies } from '../server/movies.js';

export default {
  fetch(request) {
    return handleMovies(request, process.env.TMDB_READ_TOKEN);
  },
};
