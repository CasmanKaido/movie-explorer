import { appName } from '../config/env.js';
import SearchArea from './SearchArea.jsx';
import Icon from './Icon.jsx';

export default function Navbar({ view, onNavigate, menuOpen, onToggleMenu }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="sidebar" onClick={onToggleMenu}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <a href="#home" className="brand" onClick={() => onNavigate('home')}>
          <span className="brand-arc" aria-hidden="true" />
          <span>{appName}</span>
        </a>
      </div>
      <div className="navbar-content">
        <nav className="top-navigation" aria-label="Main navigation">
          <a href="#movies" className={view === 'home' ? 'active' : ''} aria-current={view === 'home' ? 'page' : undefined} onClick={() => onNavigate('home')}>Movies</a>
          <a href="#movies" className={view === 'favourites' ? 'active' : ''} aria-current={view === 'favourites' ? 'page' : undefined} onClick={() => onNavigate('favourites')}>Favourites</a>
        </nav>
        <SearchArea />
      </div>
    </header>
  );
}

export function Sidebar({ view, open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`} id="sidebar">
      <nav aria-label="Browse movies">
        <p className="sidebar-label">Menu</p>
        <a href="#home" className={`sidebar-link ${view === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}><Icon name="discover" size={17} /><span>Discover</span></a>
        <p className="sidebar-label library-label">Library</p>
        <a href="#movies" className={`sidebar-link ${view === 'favourites' ? 'active' : ''}`} onClick={() => onNavigate('favourites')}><Icon name="heart" size={17} /><span>Favourites</span></a>
      </nav>
    </aside>
  );
}
