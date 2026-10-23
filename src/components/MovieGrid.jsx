import MovieCard from './MovieCard.jsx';
import Icon from './Icon.jsx';
import LoadingState from './LoadingState.jsx';

export default function MovieGrid({ movies = [], favourites = false, loading = false, error = '', onRetry, query = '' }) {
  if (loading) return <LoadingState>Loading movies…</LoadingState>;

  if (error) {
    return <div className="empty-movies"><h3>Unable to load movies</h3><p role="alert">{error}</p><button type="button" className="retry-button" onClick={onRetry}>Try again</button></div>;
  }

  if (movies.length === 0) {
    return (
      <div className="empty-movies" role="status">
        <Icon name={favourites ? 'heart' : 'film'} size={30} />
        <h3>{favourites ? 'No favourites yet' : query ? `No movies found for “${query}”` : 'No movies found'}</h3>
        <p>{favourites ? 'The films you save will appear here.' : query ? 'Try a different title or check the spelling.' : 'Try again later.'}</p>
      </div>
    );
  }

  return <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>;
}
