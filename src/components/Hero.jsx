import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import Icon from './Icon.jsx';

export default function Hero({ movie }) {
  const [imageFailed, setImageFailed] = useState(false);
  const location = useLocation();

  return (
    <section className="hero" aria-labelledby="hero-title">
      {movie?.backdrop && !imageFailed && <img className="hero-image" src={movie.backdrop} alt="" fetchPriority="high" onError={() => setImageFailed(true)} />}
      <div className="hero-backdrop" aria-hidden="true">{(!movie?.backdrop || imageFailed) && <Icon name="film" size={110} />}</div>
      <div className="hero-copy">
        {movie && <p className="hero-metadata">{movie.rating && <span className="movie-rating"><Icon name="star" size={15} />{movie.rating}</span>}<span>{movie.year}</span><span>{movie.genre}</span></p>}
        <h1 id="hero-title">{movie?.title || 'Find your next movie.'}</h1>
        <p className="hero-description">{movie?.description || 'Explore films and keep your favourites together.'}</p>
        <div className="hero-actions">{movie ? <Link className="primary-button" to={`/movie/${movie.id}`} state={{ from: location.pathname + location.search }}>See details<Icon name="arrow" size={17} /></Link> : <a className="primary-button" href="#movies">Browse movies<Icon name="arrow" size={17} /></a>}</div>
      </div>
    </section>
  );
}
