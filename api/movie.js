import { handleMovie } from '../server/movie.js';

export default {
  fetch(request) {
    return handleMovie(request, process.env.TMDB_READ_TOKEN);
  },
};
