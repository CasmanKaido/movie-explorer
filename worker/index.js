// Import { handleMovies } from ../server/movies.js.
import { handleMovies } from '../server/movies.js';
// Import { handleMovie } from ../server/movie.js.
import { handleMovie } from '../server/movie.js';
// Import assets from ../.generated/assets.js.
import assets from '../.generated/assets.js';

export default {
  async fetch(request, env) {
    // Prepare pathname for the steps below.
    const pathname = new URL(request.url).pathname;
    // Check pathname === '/api/movies' before running this branch.
    if (pathname === '/api/movies') return handleMovies(request, env.TMDB_READ_TOKEN);
    // Check pathname === '/api/movie' before running this branch.
    if (pathname === '/api/movie') return handleMovie(request, env.TMDB_READ_TOKEN);
    // Accept read requests only.
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405 });

    // Prepare is page for the steps below.
    const isPage = pathname === '/' || pathname === '/favourites' || /^\/movie\/[^/]+\/?$/.test(pathname);
    // Prepare asset for the steps below.
    const asset = assets[isPage ? '/index.html' : pathname];
    // Check !asset before running this branch.
    if (!asset) return new Response('Not found', { status: 404 });

    // Prepare bytes for the steps below.
    const bytes = Uint8Array.from(atob(asset.body), (character) => character.charCodeAt(0));
    // Reject unsupported methods and advertise GET as the allowed method.
    return new Response(request.method === 'HEAD' ? null : bytes, {
      // Set headers, including a fallback when the source value is unavailable.
      headers: { 'Content-Type': asset.type, 'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache' },
    });
  },
};
