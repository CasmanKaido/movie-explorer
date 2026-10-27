// Import { useState } from react.
import { useState } from 'react';
// Import { Link, useLocation } from react-router.
import { Link, useLocation } from 'react-router';
// Import { formatReleaseDate } from ../utils/movieFormatting.js.
import { formatReleaseDate } from '../utils/movieFormatting.js';
// Import FavouriteButton from ./FavouriteButton.jsx.
import FavouriteButton from './FavouriteButton.jsx';
// Import Icon from ./Icon.jsx.
import Icon from './Icon.jsx';

// Show one movie with its artwork, details link and save control.
export default function MovieCard({ movie }) {
  // Keep image failed in React state so changes update the screen.
  const [imageFailed, setImageFailed] = useState(false);
  // Read the current route and its search parameters.
  const location = useLocation();
  // Format this movie’s release date for display.
  const releaseDate = formatReleaseDate(movie.releaseDate);

  // Return the interface that React should display.
  return (
    // Render the movie card area.
    <article className="movie-card">
      {/* Link to this app page without a full browser reload; mark the active page where applicable. */}
      <Link className="movie-card-link" to={`/movie/${movie.id}`} state={{ from: location.pathname + location.search }} aria-label={`View details for ${movie.title}`}>
        {/* Render the movie poster area. */}
        <div className="movie-poster">
          {/* Show this content only when its condition is met. */}
          {movie.poster && !imageFailed ? (
            // Display the artwork, with alternative text and an error fallback where provided.
            <img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" onError={() => setImageFailed(true)} />
          ) : (
            // Render the poster fallback area.
            <div className="poster-fallback"><Icon name="film" size={36} /><span>Poster unavailable</span></div>
          )}
        </div>
        {/* Render the movie card info area. */}
        <div className="movie-card-info">
          {/* Render the h3 element. */}
          <h3>{movie.title}</h3>
          {/* Render the p element. */}
          <p>{releaseDate}</p>
          {/* Show this content only when its condition is met. */}
          {movie.genre && <p>{movie.genre}</p>}
          {/* Render the movie rating area. */}
          <span className="movie-rating"><Icon name="star" size={14} />{movie.rating ?? 'Not rated'}</span>
        </div>
      </Link>
      {/* Show the shared control for saving or removing this movie. */}
      <FavouriteButton movie={movie} compact />
    </article>
  );
}
