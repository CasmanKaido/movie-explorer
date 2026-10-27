// Use one consistent localStorage key for the saved collection.
export const favouritesKey = 'movie-explorer:favourites';

// Keep only the valid movie fields needed by a favourite card.
function savedMovie(movie) {
  // Require a valid movie object and numeric ID before using its fields.
  if (!movie || !Number.isInteger(movie.id) || movie.id <= 0 || typeof movie.title !== 'string' || !movie.title.trim()) return null;
  // Return the validated values for the caller to use.
  return {
    // Set id.
    id: movie.id,
    // Set title.
    title: movie.title,
    // Set poster, including a fallback when the source value is unavailable.
    poster: typeof movie.poster === 'string' ? movie.poster : null,
    // Set release date, including a fallback when the source value is unavailable.
    releaseDate: typeof movie.releaseDate === 'string' ? movie.releaseDate : null,
    // Set rating, including a fallback when the source value is unavailable.
    rating: typeof movie.rating === 'string' || typeof movie.rating === 'number' ? movie.rating : null,
    // Set genre, including a fallback when the source value is unavailable.
    genre: typeof movie.genre === 'string' ? movie.genre : Array.isArray(movie.genres) ? movie.genres.filter((genre) => typeof genre === 'string').join(', ') : '',
  };
}

// Recover saved JSON safely and remove invalid or duplicate entries.
export function readFavourites(storage) {
  // Attempt this operation and handle failures in the catch block.
  try {
    // Read or normalize the saved movie data before using it.
    const saved = JSON.parse(storage.getItem(favouritesKey) || '[]');
    // Discard saved JSON that is not a movie array.
    if (!Array.isArray(saved)) return [];
    // Normalize TMDB results into the fields used by movie cards.
    const movies = saved.map(savedMovie).filter(Boolean);
    // Deduplicate movies by ID and return the stored movie values.
    return [...new Map(movies.map((movie) => [movie.id, movie])).values()];
  } catch {
    // Recover with an empty collection when stored data cannot be read.
    return [];
  }
}

// Serialize and save the collection in localStorage.
export function writeFavourites(storage, movies) {
  // Serialize the collection as JSON and store it on this device.
  storage.setItem(favouritesKey, JSON.stringify(movies));
}

// Remove an already-saved movie or add it once to the front of the list.
export function toggleFavourite(movies, movie) {
  // Read or normalize the saved movie data before using it.
  const saved = savedMovie(movie);
  // Leave the collection unchanged if this movie cannot be saved safely.
  if (!saved) return movies;
  // Remove the matching ID if saved; otherwise prepend the validated movie.
  return movies.some((item) => item.id === saved.id) ? movies.filter((item) => item.id !== saved.id) : [saved, ...movies];
}
