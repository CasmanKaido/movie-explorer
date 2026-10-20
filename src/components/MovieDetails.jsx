import { useState } from 'react';
import Icon from './Icon.jsx';
import { formatReleaseDate, formatRuntime } from '../utils/movieFormatting.js';

export default function MovieDetails({ movie }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const [backdropFailed, setBackdropFailed] = useState(false);

  return (
    <article className="movie-details" aria-labelledby="movie-title">
      <div className="details-banner" aria-hidden="true">
        {movie.backdrop && !backdropFailed && <img src={movie.backdrop} alt="" onError={() => setBackdropFailed(true)} />}
      </div>
      <div className="details-content">
        <div className="details-poster">
          {movie.poster && !posterFailed ? <img src={movie.poster} alt={`${movie.title} poster`} onError={() => setPosterFailed(true)} /> : <div className="poster-fallback"><Icon name="film" size={46} /><span>Poster unavailable</span></div>}
        </div>
        <div className="details-copy">
          <p className="details-year">{movie.year}</p>
          <h1 id="movie-title">{movie.title}</h1>
          {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}
          <div className="details-metadata">
            <span className="movie-rating"><Icon name="star" size={16} />{movie.rating ? `${movie.rating} / 10` : 'Not rated'}</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>{formatReleaseDate(movie.releaseDate)}</span>
          </div>
          {movie.genres.length > 0 && <ul className="details-genres" aria-label="Genres">{movie.genres.map((genre) => <li key={genre}>{genre}</li>)}</ul>}
          <section className="details-overview" aria-labelledby="overview-title">
            <h2 id="overview-title">Overview</h2>
            <p>{movie.description || 'No description available.'}</p>
          </section>
          <section className="details-information" aria-labelledby="information-title">
            <h2 id="information-title">Movie information</h2>
            <dl>
              <div><dt>Director</dt><dd>{movie.directors.join(', ') || 'Not available'}</dd></div>
              <div><dt>Status</dt><dd>{movie.status || 'Not available'}</dd></div>
              <div><dt>Original title</dt><dd>{movie.originalTitle || movie.title}</dd></div>
              <div><dt>Languages</dt><dd>{movie.languages.join(', ') || 'Not available'}</dd></div>
              <div><dt>Production countries</dt><dd>{movie.countries.join(', ') || 'Not available'}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </article>
  );
}
