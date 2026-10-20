import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import useMovie from '../hooks/useMovie.js';
import MovieDetails from '../components/MovieDetails.jsx';
import Icon from '../components/Icon.jsx';
import { appName } from '../config/env.js';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { movie, loading, error, retry } = useMovie(id);
  const from = location.state?.from;
  const returnTo = typeof from === 'string' && (from === '/favourites' || from === '/' || from.startsWith('/?')) ? from : '/';

  useEffect(() => {
    document.title = movie ? `${movie.title} | ${appName}` : appName;
    return () => { document.title = appName; };
  }, [movie]);

  return (
    <div className="details-page">
      <Link className="back-link" to={returnTo}><Icon name="arrow" size={16} className="rotate-180" />Back to movies</Link>
      {loading ? <div className="empty-movies" role="status"><p>Loading movie details…</p></div> : error ? (
        <div className="empty-movies"><h1>{error.notFound ? 'Movie not found' : 'Unable to load movie'}</h1><p role="alert">{error.message}</p>{!error.notFound && <button className="retry-button" onClick={retry}>Try again</button>}</div>
      ) : movie && <MovieDetails key={movie.id} movie={movie} />}
    </div>
  );
}
