// Import { Link } from react-router.
import { Link } from 'react-router';
// Import MovieGrid from ../components/MovieGrid.jsx.
import MovieGrid from '../components/MovieGrid.jsx';
// Import { useFavourites } from ../context/FavouritesContext.jsx.
import { useFavourites } from '../context/FavouritesContext.jsx';

// Display the movies saved on this device.
export default function FavouritesPage() {
  // Read the shared favourites collection and its save controls.
  const { favourites, storageError } = useFavourites();

  // Return the interface that React should display.
  return (
    // Render the movies section favourites section area with accessible labelling.
    <section className="movies-section favourites-section" id="movies" aria-labelledby="movies-title">
      {/* Render the section heading area. */}
      <div className="section-heading">
        {/* Render the h1 element. */}
        <h1 id="movies-title">Your favourites</h1>
        {/* Render the favourites total area. */}
        <span className="favourites-total" role="status">{favourites.length} {favourites.length === 1 ? 'movie' : 'movies'}</span>
      </div>
      {/* Show this content only when its condition is met. */}
      {storageError && <p className="favourites-notice" role="alert">{storageError}</p>}
      {/* Render the MovieGrid element. */}
      <MovieGrid movies={favourites} favourites />
      {/* Show this content only when its condition is met. */}
      {favourites.length === 0 && <Link className="primary-button" to="/">Browse movies</Link>}
    </section>
  );
}
