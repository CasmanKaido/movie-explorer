// Import { useEffect } from react.
import { useEffect } from 'react';
// Import { Link, useLocation, useParams } from react-router.
import { Link, useLocation, useParams } from 'react-router';
// Import useMovie from ../hooks/useMovie.js.
import useMovie from '../hooks/useMovie.js';
// Import MovieDetails from ../components/MovieDetails.jsx.
import MovieDetails from '../components/MovieDetails.jsx';
// Import LoadingState from ../components/LoadingState.jsx.
import LoadingState from '../components/LoadingState.jsx';
// Import Icon from ../components/Icon.jsx.
import Icon from '../components/Icon.jsx';
// Import { appName } from ../config/env.js.
import { appName } from '../config/env.js';

// Load the requested movie and keep a safe route back to its list.
export default function MovieDetailsPage() {
  // Prepare { id } for the steps below.
  const { id } = useParams();
  // Read the current route and its search parameters.
  const location = useLocation();
  // Load details for this movie ID and expose loading, error and retry state.
  const { movie, loading, error, retry } = useMovie(id);
  // Read the list route recorded when the movie was opened.
  const from = location.state?.from;
  // Allow only internal movie-list links as the Back destination.
  const returnTo = typeof from === 'string' && (from === '/favourites' || from === '/' || from.startsWith('/?')) ? from : '/';

  // Run this effect when its listed dependencies change; return cleanup for the previous run.
  useEffect(() => {
    // Run document.title = movie ? `${movie.title} | ${appName}` : appName.
    document.title = movie ? `${movie.title} | ${appName}` : appName;
    // Return () => { document.title = appName; }.
    return () => { document.title = appName; };
  }, [movie]);

  // Return the interface that React should display.
  return (
    // Render the details page area.
    <div className="details-page">
      {/* Link to this app page without a full browser reload; mark the active page where applicable. */}
      <Link className="back-link" to={returnTo}><Icon name="arrow" size={16} className="rotate-180" />Back to movies</Link>
      {/* Show this content only when its condition is met. */}
      {loading ? <LoadingState>Loading movie details…</LoadingState> : error ? (
        // Render the empty movies area.
        <div className="empty-movies"><h1>{error.notFound ? 'Movie not found' : 'Unable to load movie'}</h1><p role="alert">{error.message}</p>{!error.notFound && <button type="button" className="retry-button" onClick={retry}>Try again</button>}</div>
      ) : movie && <MovieDetails key={movie.id} movie={movie} />}
    </div>
  );
}
