import { useState } from 'react';
import Navbar, { Sidebar } from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
  const [view, setView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const favourites = view === 'favourites';

  function navigate(nextView) {
    setView(nextView);
    setMenuOpen(false);
  }

  return (
    <div className="app-shell" id="home">
      <a className="skip-link" href="#movies">Skip to movies</a>
      <Navbar view={view} onNavigate={navigate} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <div className="dashboard">
        <Sidebar view={view} open={menuOpen} onNavigate={navigate} />
        <main className="main-content">
          {!favourites && <Hero />}
          <section className="movies-section" id="movies" aria-labelledby="movies-title">
            <div className="section-heading"><h2 id="movies-title">{favourites ? 'Your favourites' : 'Movies'}</h2></div>
            <MovieGrid favourites={favourites} />
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
}
