// Import MovieCard from ./MovieCard.jsx.
import MovieCard from './MovieCard.jsx';
// Import Icon from ./Icon.jsx.
import Icon from './Icon.jsx';
// Import LoadingState from ./LoadingState.jsx.
import LoadingState from './LoadingState.jsx';

// Choose between loading, error, empty and populated movie views.
export default function MovieGrid({ movies = [], favourites = false, loading = false, error = '', onRetry, query = '' }) {
  // Check loading before running this branch.
  if (loading) return <LoadingState>Loading movies…</LoadingState>;

  // Check error before running this branch.
  if (error) {
    // Return the interface that React should display.
    return <div className="empty-movies"><h3>Unable to load movies</h3><p role="alert">{error}</p><button type="button" className="retry-button" onClick={onRetry}>Try again</button></div>;
  }

  // Check movies.length === 0 before running this branch.
  if (movies.length === 0) {
    // Return the interface that React should display.
    return (
      // Render the empty movies area.
      <div className="empty-movies" role="status">
        {/* Draw the decorative icon using the requested name and size. */}
        <Icon name={favourites ? 'heart' : 'film'} size={30} />
        {/* Render the h3 element. */}
        <h3>{favourites ? 'No favourites yet' : query ? `No movies found for “${query}”` : 'No movies found'}</h3>
        {/* Render the p element. */}
        <p>{favourites ? 'The films you save will appear here.' : query ? 'Try a different title or check the spelling.' : 'Try again later.'}</p>
      </div>
    );
  }

  // Return the interface that React should display.
  return <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>;
}
