import { Link } from 'react-router';
import MovieGrid from '../components/MovieGrid.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';

export default function FavouritesPage() {
  const { favourites, storageError } = useFavourites();

  return (
    <section className="movies-section favourites-section" id="movies" aria-labelledby="movies-title">
      <div className="section-heading">
        <h1 id="movies-title">Your favourites</h1>
        <span className="favourites-total" role="status">{favourites.length} {favourites.length === 1 ? 'movie' : 'movies'}</span>
      </div>
      {storageError && <p className="favourites-notice" role="alert">{storageError}</p>}
      <MovieGrid movies={favourites} favourites />
      {favourites.length === 0 && <Link className="primary-button" to="/">Browse movies</Link>}
    </section>
  );
}
