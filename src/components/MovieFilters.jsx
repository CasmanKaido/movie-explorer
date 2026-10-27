import { Link } from 'react-router';
import { movieCategories } from '../config/categories.js';

export default function MovieFilters({ category, genre, genres, timeWindow, loading, onGenreChange, onWindowChange }) {
  return (
    <div className="movie-filters">
      <nav className="movie-categories" aria-label="Movie categories">
        {movieCategories.map((item) => (
          <Link key={item.id} to={item.id === 'popular' ? '/' : `/?category=${item.id}`} aria-current={!genre && category === item.id ? 'page' : undefined}>{item.label}</Link>
        ))}
      </nav>
      <div className="movie-filter-options">
        <label className="movie-filter">Genre
          <select value={genre} onChange={(event) => onGenreChange(event.target.value)} disabled={loading && genres.length === 0}>
            <option value="">All genres</option>
            {genres.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        {!genre && category === 'trending' && <label className="movie-filter">Trending
          <select value={timeWindow} onChange={(event) => onWindowChange(event.target.value)}>
            <option value="day">Today</option>
            <option value="week">This week</option>
          </select>
        </label>}
      </div>
    </div>
  );
}
