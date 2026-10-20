import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { formatReleaseDate } from '../utils/movieFormatting.js';
import FavouriteButton from './FavouriteButton.jsx';
import Icon from './Icon.jsx';

export default function MovieCard({ movie }) {
  const [imageFailed, setImageFailed] = useState(false);
  const location = useLocation();
  const releaseDate = formatReleaseDate(movie.releaseDate);

  return (
    <article className="movie-card">
      <Link className="movie-card-link" to={`/movie/${movie.id}`} state={{ from: location.pathname + location.search }} aria-label={`View details for ${movie.title}`}>
        <div className="movie-poster">
          {movie.poster && !imageFailed ? (
            <img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" onError={() => setImageFailed(true)} />
          ) : (
            <div className="poster-fallback"><Icon name="film" size={36} /><span>Poster unavailable</span></div>
          )}
        </div>
        <div className="movie-card-info">
          <h3>{movie.title}</h3>
          <p>{releaseDate}</p>
          {movie.genre && <p>{movie.genre}</p>}
          <span className="movie-rating"><Icon name="star" size={14} />{movie.rating ?? 'Not rated'}</span>
        </div>
      </Link>
      <FavouriteButton movie={movie} compact />
    </article>
  );
}
