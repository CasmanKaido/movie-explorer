// Import { useEffect, useState } from react.
import { useEffect, useState } from 'react';
// Import { Link, Route, Routes, useLocation, useNavigate } from react-router.
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router';
// Import Navbar from ./components/Navbar.jsx.
import Navbar from './components/Navbar.jsx';
// Import Footer from ./components/Footer.jsx.
import Footer from './components/Footer.jsx';
// Import HomePage from ./pages/HomePage.jsx.
import HomePage from './pages/HomePage.jsx';
// Import FavouritesPage from ./pages/FavouritesPage.jsx.
import FavouritesPage from './pages/FavouritesPage.jsx';
// Import { useFavourites } from ./context/FavouritesContext.jsx.
import { useFavourites } from './context/FavouritesContext.jsx';
// Import MovieDetailsPage from ./pages/MovieDetailsPage.jsx.
import MovieDetailsPage from './pages/MovieDetailsPage.jsx';

// Connect the shared header, page routes and footer.
export default function App() {
  // Read the current route and its search parameters.
  const location = useLocation();
  // Read the shared favourites collection and its save controls.
  const { favourites } = useFavourites();
  // Get the function used to change pages without reloading.
  const navigate = useNavigate();
  // Keep search value in React state so changes update the screen.
  const [searchValue, setSearchValue] = useState('');
  // Choose which header link is active for this route.
  const view = location.pathname === '/favourites' ? 'favourites' : location.pathname === '/' ? 'home' : 'details';

  // Run this effect when its listed dependencies change; return cleanup for the previous run.
  useEffect(() => {
    // Synchronize the search field when returning to the home page.
    if (location.pathname === '/') {
      // Read the movie search text, using an empty string when it is missing.
      const query = new URLSearchParams(location.search).get('q') || '';
      // Update search value so React displays the new value.
      setSearchValue(query);
      // Scroll search results into view when opening a search URL.
      if (query) document.getElementById('movies')?.scrollIntoView({ block: 'start' });
      else window.scrollTo(0, 0);
    } else window.scrollTo(0, 0);
  }, [location.key, location.pathname, location.search]);

  // Keep browse filters in the URL while replacing or removing the search query.
  function searchMovies(value) {
    // Build URL parameters without manual escaping.
    const params = new URLSearchParams(location.pathname === '/' ? location.search : '');
    // Update the URL parameters sent with the movie request.
    params.delete('q');
    // Check value before running this branch.
    if (value) params.set('q', value);
    // Update search value so React displays the new value.
    setSearchValue(value);
    // Open the requested route while keeping navigation inside the app.
    navigate({ pathname: '/', search: params.size ? `?${params}` : '' });
  }

  // Return the interface that React should display.
  return (
    // Render the app shell area.
    <div className="app-shell" id="home">
      {/* Render the skip link area. */}
      <a className="skip-link" href="#main-content">Skip to content</a>
      {/* Render the Navbar element. */}
      <Navbar savedCount={favourites.length} view={view} searchValue={searchValue} onSearchChange={setSearchValue} onSearch={searchMovies} />
      {/* Render the dashboard area. */}
      <div className="dashboard">
        {/* Render the main content area. */}
        <main className="main-content" id="main-content">
          {/* Render the Routes element. */}
          <Routes>
            {/* Match this URL path to the page component it should display. */}
            <Route path="/" element={<HomePage />} />
            {/* Match this URL path to the page component it should display. */}
            <Route path="/favourites" element={<FavouritesPage />} />
            {/* Match this URL path to the page component it should display. */}
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            {/* Match this URL path to the page component it should display. */}
            <Route path="*" element={<div className="empty-movies"><h1>Page not found</h1><Link className="primary-button" to="/">Back to movies</Link></div>} />
          </Routes>
          {/* Render the Footer element. */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
