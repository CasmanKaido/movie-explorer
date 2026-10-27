// Import Icon from ./Icon.jsx.
import Icon from './Icon.jsx';

// Submit and clear the search using the same handlers for mouse and keyboard.
export default function SearchArea({ value, onChange, onSearch }) {
  // Submit trimmed search text without a browser page reload.
  function submitSearch(event) {
    // Prevent the form from reloading the page on submission.
    event.preventDefault();
    // Run onSearch(value.trim()).
    onSearch(value.trim());
  }

  // Clear the input and return to the browse results.
  function clearSearch() {
    // Run onChange('').
    onChange('');
    // Run onSearch('').
    onSearch('');
  }

  // Return the interface that React should display.
  return (
    // Render the search area area with accessible labelling.
    <form className="search-area" role="search" aria-label="Movie search" onSubmit={submitSearch}>
      {/* Draw the decorative icon using the requested name and size. */}
      <Icon name="search" size={17} />
      {/* Render the sr only area. */}
      <label className="sr-only" htmlFor="movie-search">Search movies</label>
      {/* Keep the search field tied to React state and forward typed changes. */}
      <input id="movie-search" type="search" placeholder="Search movies" maxLength={100} value={value} onChange={(event) => onChange(event.target.value)} />
      {/* Show this content only when its condition is met. */}
      {value && <button className="search-clear" type="button" onClick={clearSearch} aria-label="Clear search"><Icon name="close" size={15} /></button>}
      {/* Provide a keyboard-accessible button and run its click or submit action. */}
      <button className="search-button" type="submit" aria-label="Search movies"><Icon name="arrow" size={17} /></button>
    </form>
  );
}
