// Import { useState } from react.
import { useState } from 'react';
// Import Icon from ./Icon.jsx.
import Icon from './Icon.jsx';
// Import FavouriteButton from ./FavouriteButton.jsx.
import FavouriteButton from './FavouriteButton.jsx';
// Import { formatReleaseDate, formatRuntime } from ../utils/movieFormatting.js.
import { formatReleaseDate, formatRuntime } from '../utils/movieFormatting.js';

// Present a movie’s artwork, description and production information.
export default function MovieDetails({ movie }) {
  // Keep poster failed in React state so changes update the screen.
  const [posterFailed, setPosterFailed] = useState(false);
  // Keep backdrop failed in React state so changes update the screen.
  const [backdropFailed, setBackdropFailed] = useState(false);

  // Return the interface that React should display.
  return (
    // Render the movie details area with accessible labelling.
    <article className="movie-details" aria-labelledby="movie-title">
      {/* Render the details banner area with accessible labelling. */}
      <div className="details-banner" aria-hidden="true">
        {/* Show this content only when its condition is met. */}
        {movie.backdrop && !backdropFailed && <img src={movie.backdrop} alt="" onError={() => setBackdropFailed(true)} />}
      </div>
      {/* Render the details content area. */}
      <div className="details-content">
        {/* Render the details poster area. */}
        <div className="details-poster">
          {/* Show this content only when its condition is met. */}
          {movie.poster && !posterFailed ? <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setPosterFailed(true)} /> : <div className="poster-fallback"><Icon name="film" size={46} /><span>Poster unavailable</span></div>}
        </div>
        {/* Render the details copy area. */}
        <div className="details-copy">
          {/* Render the details year area. */}
          <p className="details-year">{movie.year}</p>
          {/* Render the h1 element. */}
          <h1 id="movie-title">{movie.title}</h1>
          {/* Show this content only when its condition is met. */}
          {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}
          {/* Render the details metadata area. */}
          <div className="details-metadata">
            {/* Render the movie rating area. */}
            <span className="movie-rating"><Icon name="star" size={16} />{movie.rating ? `${movie.rating} / 10` : 'Not rated'}</span>
            {/* Render the span element. */}
            <span>{formatRuntime(movie.runtime)}</span>
            {/* Render the span element. */}
            <span>{formatReleaseDate(movie.releaseDate)}</span>
          </div>
          {/* Render one item for each entry, using stable keys to help React track them. */}
          {movie.genres.length > 0 && <ul className="details-genres" aria-label="Genres">{movie.genres.map((genre) => <li key={genre}>{genre}</li>)}</ul>}
          {/* Render the details save area. */}
          <div className="details-save"><FavouriteButton movie={movie} /></div>
          {/* Render the details overview area with accessible labelling. */}
          <section className="details-overview" aria-labelledby="overview-title">
            {/* Render the h2 element. */}
            <h2 id="overview-title">Overview</h2>
            {/* Render the p element. */}
            <p>{movie.description || 'No description available.'}</p>
          </section>
          {/* Render the details information area with accessible labelling. */}
          <section className="details-information" aria-labelledby="information-title">
            {/* Render the h2 element. */}
            <h2 id="information-title">Movie information</h2>
            {/* Render the dl element. */}
            <dl>
              {/* Render the div element. */}
              <div><dt>Director</dt><dd>{movie.directors.join(', ') || 'Not available'}</dd></div>
              {/* Render the div element. */}
              <div><dt>Status</dt><dd>{movie.status || 'Not available'}</dd></div>
              {/* Render the div element. */}
              <div><dt>Original title</dt><dd>{movie.originalTitle || movie.title}</dd></div>
              {/* Render the div element. */}
              <div><dt>Languages</dt><dd>{movie.languages.join(', ') || 'Not available'}</dd></div>
              {/* Render the div element. */}
              <div><dt>Production countries</dt><dd>{movie.countries.join(', ') || 'Not available'}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </article>
  );
}
