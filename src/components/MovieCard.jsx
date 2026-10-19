import { useState } from 'react';
import Icon from './Icon.jsx';

export default function MovieCard({ movie }) {
  const [imageFailed, setImageFailed] = useState(false);
  const releaseDate = movie.releaseDate
    ? new Date(`${movie.releaseDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    : 'Release date unavailable';

  return (
    <article className="movie-card">
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
    </article>
  );
}
