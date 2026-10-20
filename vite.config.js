import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { handleMovies } from './server/movies.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  function movieApi(server) {
    server.middlewares.use('/api/movies', async (request, response) => {
      const result = await handleMovies(new Request(new URL(request.originalUrl || request.url, 'http://localhost'), { method: request.method }), env.TMDB_READ_TOKEN || process.env.TMDB_READ_TOKEN);
      response.statusCode = result.status;
      for (const [name, value] of result.headers) response.setHeader(name, value);
      response.end(await result.text());
    });
  }

  return {
    plugins: [react(), tailwindcss(), { name: 'movie-api', configureServer: movieApi, configurePreviewServer: movieApi }],
  };
});
