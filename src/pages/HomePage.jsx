import { useLocation, useSearchParams } from 'react-router';
import Hero from '../components/Hero.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import useMovies from '../hooks/useMovies.js';
import MovieFilters from '../components/MovieFilters.jsx';
import { movieCategories } from '../config/categories.js';

export default function HomePage() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const query = params.get('q')?.trim() || '';
  const category = movieCategories.some((item) => item.id === params.get('category')) ? params.get('category') : 'popular';
  const genre = /^[1-9]\d{0,4}$/.test(params.get('genre') || '') ? params.get('genre') : '';
  const timeWindow = params.get('window') === 'day' ? 'day' : 'week';
  const { movies, genres, loading, error, retry } = useMovies(query, location.key, category, genre, timeWindow);
  const featuredMovie = movies.find((movie) => movie.backdrop) || movies[0];
  const genreName = genres.find((item) => String(item.id) === genre)?.name;
  let title = `${movieCategories.find((item) => item.id === category).label} movies`;
  if (category === 'trending') title = `Trending ${timeWindow === 'day' ? 'today' : 'this week'}`;
  if (genre) title = `${genreName || 'Genre'} movies`;
  if (query) title = `Results for “${query}”`;

  function changeGenre(value) {
    setParams(value ? { genre: value } : {});
  }

  function changeWindow(value) {
    setParams({ category: 'trending', window: value });
  }

  return (
    <>
      {!query && !genre && category === 'popular' && <Hero key={featuredMovie?.id || 'empty'} movie={featuredMovie} />}
      <section className="movies-section" id="movies" aria-labelledby="movies-title">
        {!query && <MovieFilters category={category} genre={genre} genres={genres} timeWindow={timeWindow} loading={loading} onGenreChange={changeGenre} onWindowChange={changeWindow} />}
        <div className="section-heading"><h2 id="movies-title">{title}</h2></div>
        <MovieGrid movies={movies} loading={loading} error={error} onRetry={retry} query={query} />
      </section>
    </>
  );
}
