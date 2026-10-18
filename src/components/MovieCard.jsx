import { useState } from 'react';
import Icon from './Icon.jsx';

export default function MovieCard({ movie }) {
  const [imageFailed, setImageFailed] = useState(false);

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
        <p>{movie.year}{movie.genre && ` · ${movie.genre}`}</p>
        {movie.rating != null && <span className="movie-rating"><Icon name="star" size={14} />{movie.rating}</span>}
      </div>
    </article>
  );
}
