import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router';
import Navbar, { Sidebar } from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import MovieDetailsPage from './pages/MovieDetailsPage.jsx';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const view = location.pathname === '/favourites' ? 'favourites' : location.pathname === '/' ? 'home' : 'details';

  useEffect(() => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const query = new URLSearchParams(location.search).get('q') || '';
      setSearchValue(query);
      if (query) document.getElementById('movies')?.scrollIntoView({ block: 'start' });
      else window.scrollTo(0, 0);
    } else window.scrollTo(0, 0);
  }, [location.key, location.pathname, location.search]);

  function searchMovies(value) {
    const params = new URLSearchParams();
    if (value) params.set('q', value);
    setSearchValue(value);
    navigate({ pathname: '/', search: params.size ? `?${params}` : '' });
  }

  return (
    <div className="app-shell" id="home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar view={view} onNavigate={() => setMenuOpen(false)} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} searchValue={searchValue} onSearchChange={setSearchValue} onSearch={searchMovies} />
      <div className="dashboard">
        <Sidebar view={view} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        <main className="main-content" id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourites" element={<HomePage favourites />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="*" element={<div className="empty-movies"><h1>Page not found</h1><Link className="primary-button" to="/">Back to movies</Link></div>} />
          </Routes>
          <Footer />
        </main>
      </div>
    </div>
  );
}
