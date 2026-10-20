import { useLocation, useSearchParams } from 'react-router';
import Hero from '../components/Hero.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import useMovies from '../hooks/useMovies.js';

export default function HomePage({ favourites = false }) {
  const [params] = useSearchParams();
  const location = useLocation();
  const query = favourites ? '' : params.get('q')?.trim() || '';
  const { movies, loading, error, retry } = useMovies(query, location.key);
  const featuredMovie = movies.find((movie) => movie.backdrop) || movies[0];

  return (
    <>
      {!favourites && !query && <Hero key={featuredMovie?.id || 'empty'} movie={featuredMovie} />}
      <section className="movies-section" id="movies" aria-labelledby="movies-title">
        <div className="section-heading"><h2 id="movies-title">{favourites ? 'Your favourites' : query ? `Results for “${query}”` : 'Movies'}</h2></div>
        <MovieGrid movies={favourites ? [] : movies} favourites={favourites} loading={!favourites && loading} error={favourites ? '' : error} onRetry={retry} query={query} />
      </section>
    </>
  );
}
