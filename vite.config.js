// Import { defineConfig, loadEnv } from vite.
import { defineConfig, loadEnv } from 'vite';
// Import react from @vitejs/plugin-react.
import react from '@vitejs/plugin-react';
// Import tailwindcss from @tailwindcss/vite.
import tailwindcss from '@tailwindcss/vite';
// Import { handleMovies } from ./server/movies.js.
import { handleMovies } from './server/movies.js';
// Import { handleMovie } from ./server/movie.js.
import { handleMovie } from './server/movie.js';

export default defineConfig(({ mode }) => {
  // Prepare env for the steps below.
  const env = loadEnv(mode, process.cwd(), '');

  // Define movieApi and receive the values it needs.
  function movieApi(server) {
    // Process each entry in the collection.
    for (const [path, handler] of [['/api/movies', handleMovies], ['/api/movie', handleMovie]]) {
      // Run server.middlewares.use(path, async (request, response) => {.
      server.middlewares.use(path, async (request, response) => {
        // Prepare result for the steps below.
        const result = await handler(new Request(new URL(request.originalUrl || request.url, 'http://localhost'), { method: request.method }), env.TMDB_READ_TOKEN || process.env.TMDB_READ_TOKEN);
        // Run response.statusCode = result.status.
        response.statusCode = result.status;
        // Process each entry in the collection.
        for (const [name, value] of result.headers) response.setHeader(name, value);
        // Run response.end(await result.text()).
        response.end(await result.text());
      });
    }
  }

  // Return the validated values for the caller to use.
  return {
    // Set plugins.
    plugins: [react(), tailwindcss(), { name: 'movie-api', configureServer: movieApi, configurePreviewServer: movieApi }],
  };
});
