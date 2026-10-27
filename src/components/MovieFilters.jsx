// Import { Link } from react-router.
import { Link } from 'react-router';
// Import { movieCategories } from ../config/categories.js.
import { movieCategories } from '../config/categories.js';

// Let visitors switch category, genre and trending period.
export default function MovieFilters({ category, genre, genres, timeWindow, loading, onGenreChange, onWindowChange }) {
  // Return the interface that React should display.
  return (
    // Render the movie filters area.
    <div className="movie-filters">
      {/* Render the movie categories area with accessible labelling. */}
      <nav className="movie-categories" aria-label="Movie categories">
        {/* Render one item for each entry, using stable keys to help React track them. */}
        {movieCategories.map((item) => (
          // Link to this app page without a full browser reload; mark the active page where applicable.
          <Link key={item.id} to={item.id === 'popular' ? '/' : `/?category=${item.id}`} aria-current={!genre && category === item.id ? 'page' : undefined}>{item.label}</Link>
        ))}
      </nav>
      {/* Render the movie filter options area. */}
      <div className="movie-filter-options">
        {/* Render the movie filter area. */}
        <label className="movie-filter">Genre
          {/* Display the selected filter and send changes to its handler. */}
          <select value={genre} onChange={(event) => onGenreChange(event.target.value)} disabled={loading && genres.length === 0}>
            {/* Render the option element. */}
            <option value="">All genres</option>
            {/* Render one item for each entry, using stable keys to help React track them. */}
            {genres.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        {/* Show this content only when its condition is met. */}
        {!genre && category === 'trending' && <label className="movie-filter">Trending
          {/* Display the selected filter and send changes to its handler. */}
          <select value={timeWindow} onChange={(event) => onWindowChange(event.target.value)}>
            {/* Render the option element. */}
            <option value="day">Today</option>
            {/* Render the option element. */}
            <option value="week">This week</option>
          </select>
        </label>}
      </div>
    </div>
  );
}
