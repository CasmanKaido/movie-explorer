// Import { Link } from react-router.
import { Link } from 'react-router';
// Import { appName } from ../config/env.js.
import { appName } from '../config/env.js';
// Import SearchArea from ./SearchArea.jsx.
import SearchArea from './SearchArea.jsx';

// Keep the main navigation and movie search together in the header.
export default function Navbar({ savedCount = 0, view, searchValue, onSearchChange, onSearch }) {
  // Return the interface that React should display.
  return (
    // Render the navbar area.
    <header className="navbar">
      {/* Render the navbar brand area. */}
      <div className="navbar-brand">
        {/* Link to this app page without a full browser reload; mark the active page where applicable. */}
        <Link to="/" className="brand">
          {/* Render the brand arc area with accessible labelling. */}
          <span className="brand-arc" aria-hidden="true" />
          {/* Render the span element. */}
          <span>{appName}</span>
        </Link>
      </div>
      {/* Render the navbar content area. */}
      <div className="navbar-content">
        {/* Render the top navigation area with accessible labelling. */}
        <nav className="top-navigation" aria-label="Main navigation">
          {/* Link to this app page without a full browser reload; mark the active page where applicable. */}
          <Link to="/" className={view === 'home' ? 'active' : ''} aria-current={view === 'home' ? 'page' : undefined}>Movies</Link>
          {/* Link to this app page without a full browser reload; mark the active page where applicable. */}
          <Link to="/favourites" className={view === 'favourites' ? 'active' : ''} aria-current={view === 'favourites' ? 'page' : undefined}>Favourites{savedCount > 0 && <span className="favourites-badge">{savedCount}</span>}</Link>
        </nav>
        {/* Render the SearchArea element. */}
        <SearchArea value={searchValue} onChange={onSearchChange} onSearch={onSearch} />
      </div>
    </header>
  );
}

