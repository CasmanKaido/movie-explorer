export const favouritesKey = 'movie-explorer:favourites';

function savedMovie(movie) {
  if (!movie || !Number.isInteger(movie.id) || movie.id <= 0 || typeof movie.title !== 'string' || !movie.title.trim()) return null;
  return {
    id: movie.id,
    title: movie.title,
    poster: typeof movie.poster === 'string' ? movie.poster : null,
    releaseDate: typeof movie.releaseDate === 'string' ? movie.releaseDate : null,
    rating: typeof movie.rating === 'string' || typeof movie.rating === 'number' ? movie.rating : null,
    genre: typeof movie.genre === 'string' ? movie.genre : Array.isArray(movie.genres) ? movie.genres.filter((genre) => typeof genre === 'string').join(', ') : '',
  };
}

export function readFavourites(storage) {
  try {
    const saved = JSON.parse(storage.getItem(favouritesKey) || '[]');
    if (!Array.isArray(saved)) return [];
    const movies = saved.map(savedMovie).filter(Boolean);
    return [...new Map(movies.map((movie) => [movie.id, movie])).values()];
  } catch {
    return [];
  }
}

export function writeFavourites(storage, movies) {
  storage.setItem(favouritesKey, JSON.stringify(movies));
}

export function toggleFavourite(movies, movie) {
  const saved = savedMovie(movie);
  if (!saved) return movies;
  return movies.some((item) => item.id === saved.id) ? movies.filter((item) => item.id !== saved.id) : [saved, ...movies];
}
