import { Link } from 'react-router';
import { appName } from '../config/env.js';
import SearchArea from './SearchArea.jsx';
import Icon from './Icon.jsx';

export default function Navbar({ view, onNavigate, menuOpen, onToggleMenu, searchValue, onSearchChange, onSearch }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="sidebar" onClick={onToggleMenu}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <Link to="/" className="brand" onClick={onNavigate}>
          <span className="brand-arc" aria-hidden="true" />
          <span>{appName}</span>
        </Link>
      </div>
      <div className="navbar-content">
        <nav className="top-navigation" aria-label="Main navigation">
          <Link to="/" className={view === 'home' ? 'active' : ''} aria-current={view === 'home' ? 'page' : undefined} onClick={onNavigate}>Movies</Link>
          <Link to="/favourites" className={view === 'favourites' ? 'active' : ''} aria-current={view === 'favourites' ? 'page' : undefined} onClick={onNavigate}>Favourites</Link>
        </nav>
        <SearchArea value={searchValue} onChange={onSearchChange} onSearch={onSearch} />
      </div>
    </header>
  );
}

export function Sidebar({ view, open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`} id="sidebar">
      <nav aria-label="Browse movies">
        <p className="sidebar-label">Menu</p>
        <Link to="/" className={`sidebar-link ${view === 'home' ? 'active' : ''}`} onClick={onNavigate}><Icon name="discover" size={17} /><span>Discover</span></Link>
        <p className="sidebar-label library-label">Library</p>
        <Link to="/favourites" className={`sidebar-link ${view === 'favourites' ? 'active' : ''}`} onClick={onNavigate}><Icon name="heart" size={17} /><span>Favourites</span></Link>
      </nav>
    </aside>
  );
}
