import { useState } from 'react';
import Navbar, { Sidebar } from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import Footer from '../components/Footer.jsx';
import useMovies from '../hooks/useMovies.js';

export default function HomePage() {
  const [view, setView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');
  const favourites = view === 'favourites';
  const { movies, loading, error, retry } = useMovies(query);
  const featuredMovie = movies.find((movie) => movie.backdrop) || movies[0];

  function navigate(nextView) {
    setView(nextView);
    setMenuOpen(false);
    setQuery('');
    setSearchValue('');
  }

  function searchMovies(value) {
    setView('home');
    setMenuOpen(false);
    setSearchValue(value);
    if (value === query) retry();
    else setQuery(value);
    document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="app-shell" id="home">
      <a className="skip-link" href="#movies">Skip to movies</a>
      <Navbar view={view} onNavigate={navigate} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} searchValue={searchValue} onSearchChange={setSearchValue} onSearch={searchMovies} />
      <div className="dashboard">
        <Sidebar view={view} open={menuOpen} onNavigate={navigate} />
        <main className="main-content">
          {!favourites && !query && <Hero key={featuredMovie?.id || 'empty'} movie={featuredMovie} />}
          <section className="movies-section" id="movies" aria-labelledby="movies-title">
            <div className="section-heading"><h2 id="movies-title">{favourites ? 'Your favourites' : query ? `Results for “${query}”` : 'Movies'}</h2></div>
            <MovieGrid movies={favourites ? [] : movies} favourites={favourites} loading={!favourites && loading} error={favourites ? '' : error} onRetry={retry} query={query} />
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
}
