// Import { Link, useLocation } from react-router.
import { Link, useLocation } from 'react-router';
// Import { useState } from react.
import { useState } from 'react';
// Import Icon from ./Icon.jsx.
import Icon from './Icon.jsx';
// Import FavouriteButton from ./FavouriteButton.jsx.
import FavouriteButton from './FavouriteButton.jsx';

// Feature a real movie from the current API results.
export default function Hero({ movie }) {
  // Keep image failed in React state so changes update the screen.
  const [imageFailed, setImageFailed] = useState(false);
  // Read the current route and its search parameters.
  const location = useLocation();

  // Return the interface that React should display.
  return (
    // Render the hero area with accessible labelling.
    <section className="hero" aria-labelledby="hero-title">
      {/* Show this content only when its condition is met. */}
      {movie?.backdrop && !imageFailed && <img className="hero-image" src={movie.backdrop} alt="" fetchPriority="high" onError={() => setImageFailed(true)} />}
      {/* Render the hero backdrop area with accessible labelling. */}
      <div className="hero-backdrop" aria-hidden="true">{(!movie?.backdrop || imageFailed) && <Icon name="film" size={110} />}</div>
      {/* Render the hero copy area. */}
      <div className="hero-copy">
        {/* Show this content only when its condition is met. */}
        {movie && <p className="hero-metadata">{movie.rating && <span className="movie-rating"><Icon name="star" size={15} />{movie.rating}</span>}<span>{movie.year}</span><span>{movie.genre}</span></p>}
        {/* Render the h1 element. */}
        <h1 id="hero-title">{movie?.title || 'Find your next movie.'}</h1>
        {/* Render the hero description area. */}
        <p className="hero-description">{movie?.description || 'Explore films and keep your favourites together.'}</p>
        {/* Render the hero actions area. */}
        <div className="hero-actions">{movie ? <Link className="primary-button" to={`/movie/${movie.id}`} state={{ from: location.pathname + location.search }}>See details<Icon name="arrow" size={17} /></Link> : <a className="primary-button" href="#movies">Browse movies<Icon name="arrow" size={17} /></a>}{movie && <FavouriteButton movie={movie} />}</div>
      </div>
    </section>
  );
}
