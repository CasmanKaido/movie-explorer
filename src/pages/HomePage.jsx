// Import { useLocation, useSearchParams } from react-router.
import { useLocation, useSearchParams } from 'react-router';
// Import Hero from ../components/Hero.jsx.
import Hero from '../components/Hero.jsx';
// Import MovieGrid from ../components/MovieGrid.jsx.
import MovieGrid from '../components/MovieGrid.jsx';
// Import useMovies from ../hooks/useMovies.js.
import useMovies from '../hooks/useMovies.js';
// Import MovieFilters from ../components/MovieFilters.jsx.
import MovieFilters from '../components/MovieFilters.jsx';
// Import { movieCategories } from ../config/categories.js.
import { movieCategories } from '../config/categories.js';

// Turn the URL filters into a movie list and a featured banner.
export default function HomePage() {
  // Prepare [params, set params] for the steps below.
  const [params, setParams] = useSearchParams();
  // Read the current route and its search parameters.
  const location = useLocation();
  // Read the movie search text, using an empty string when it is missing.
  const query = params.get('q')?.trim() || '';
  // Choose a supported movie category, falling back to Popular.
  const category = movieCategories.some((item) => item.id === params.get('category')) ? params.get('category') : 'popular';
  // Read the selected genre and reject invalid genre IDs.
  const genre = /^[1-9]\d{0,4}$/.test(params.get('genre') || '') ? params.get('genre') : '';
  // Choose the daily or weekly trending results.
  const timeWindow = params.get('window') === 'day' ? 'day' : 'week';
  // Load the selected movie list and expose loading, error and retry state.
  const { movies, genres, loading, error, retry } = useMovies(query, location.key, category, genre, timeWindow);
  // Prefer a movie with a backdrop for the banner, otherwise use the first result.
  const featuredMovie = movies.find((movie) => movie.backdrop) || movies[0];
  // Find the display name of the selected genre.
  const genreName = genres.find((item) => String(item.id) === genre)?.name;
  // Choose a heading for the current category, genre or search.
  let title = `${movieCategories.find((item) => item.id === category).label} movies`;
  // Check category === 'trending' before running this branch.
  if (category === 'trending') title = `Trending ${timeWindow === 'day' ? 'today' : 'this week'}`;
  // Check genre before running this branch.
  if (genre) title = `${genreName || 'Genre'} movies`;
  // Check query before running this branch.
  if (query) title = `Results for “${query}”`;

  // Switch to genre browsing and clear the other filters.
  function changeGenre(value) {
    // Update params so React displays the new value.
    setParams(value ? { genre: value } : {});
  }

  // Select daily or weekly trending and store it in the URL.
  function changeWindow(value) {
    // Update params so React displays the new value.
    setParams({ category: 'trending', window: value });
  }

  // Return the interface that React should display.
  return (
    // Group these elements without adding an extra HTML wrapper.
    <>
      {/* Show this content only when its condition is met. */}
      {!query && !genre && category === 'popular' && <Hero key={featuredMovie?.id || 'empty'} movie={featuredMovie} />}
      {/* Render the movies section area with accessible labelling. */}
      <section className="movies-section" id="movies" aria-labelledby="movies-title">
        {/* Show this content only when its condition is met. */}
        {!query && <MovieFilters category={category} genre={genre} genres={genres} timeWindow={timeWindow} loading={loading} onGenreChange={changeGenre} onWindowChange={changeWindow} />}
        {/* Render the section heading area. */}
        <div className="section-heading"><h2 id="movies-title">{title}</h2></div>
        {/* Render the MovieGrid element. */}
        <MovieGrid movies={movies} loading={loading} error={error} onRetry={retry} query={query} />
      </section>
    </>
  );
}
