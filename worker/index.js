import { handleMovies } from '../server/movies.js';
import { handleMovie } from '../server/movie.js';
import assets from '../.generated/assets.js';

export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/api/movies') return handleMovies(request, env.TMDB_READ_TOKEN);
    if (pathname === '/api/movie') return handleMovie(request, env.TMDB_READ_TOKEN);
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405 });

    const isPage = pathname === '/' || pathname === '/favourites' || /^\/movie\/[^/]+\/?$/.test(pathname);
    const asset = assets[isPage ? '/index.html' : pathname];
    if (!asset) return new Response('Not found', { status: 404 });

    const bytes = Uint8Array.from(atob(asset.body), (character) => character.charCodeAt(0));
    return new Response(request.method === 'HEAD' ? null : bytes, {
      headers: { 'Content-Type': asset.type, 'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache' },
    });
  },
};
