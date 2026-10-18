import MovieCard from './MovieCard.jsx';
import Icon from './Icon.jsx';

export default function MovieGrid({ movies = [], favourites = false }) {
  if (movies.length === 0) {
    return (
      <div className="empty-movies" role="status">
        <Icon name={favourites ? 'heart' : 'film'} size={30} />
        <h3>{favourites ? 'No favourites yet' : 'No movies yet'}</h3>
        <p>{favourites ? 'The films you save will appear here.' : 'Movies will appear here when they’re available.'}</p>
      </div>
    );
  }

  return <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>;
}
