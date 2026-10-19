import { useState } from 'react';
import Navbar, { Sidebar } from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import Footer from '../components/Footer.jsx';
import useMovies from '../hooks/useMovies.js';

export default function HomePage() {
  const [view, setView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const favourites = view === 'favourites';
  const { movies, loading, error, retry } = useMovies();
  const featuredMovie = movies.find((movie) => movie.backdrop) || movies[0];

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
          {!favourites && <Hero key={featuredMovie?.id || 'empty'} movie={featuredMovie} />}
          <section className="movies-section" id="movies" aria-labelledby="movies-title">
            <div className="section-heading"><h2 id="movies-title">{favourites ? 'Your favourites' : 'Movies'}</h2></div>
            <MovieGrid movies={favourites ? [] : movies} favourites={favourites} loading={!favourites && loading} error={favourites ? '' : error} onRetry={retry} />
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
}
