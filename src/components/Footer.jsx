// Import { Link } from react-router.
import { Link } from 'react-router';
// Import { appName } from ../config/env.js.
import { appName } from '../config/env.js';
// Import { movieCategories } from ../config/categories.js.
import { movieCategories } from '../config/categories.js';

// Show browse links, app information and the required TMDB credit.
export default function Footer() {
  // Return the interface that React should display.
  return (
    // Render the site footer area.
    <footer className="site-footer">
      {/* Render the footer content area. */}
      <div className="footer-content">
        {/* Render the footer intro area. */}
        <div className="footer-intro">
          {/* Link to this app page without a full browser reload; mark the active page where applicable. */}
          <Link className="footer-brand" to="/">{appName}</Link>
          {/* Render the p element. */}
          <p>Discover movies and keep your favourites in one place.</p>
        </div>
        {/* Render the footer navigation area with accessible labelling. */}
        <nav className="footer-navigation" aria-labelledby="footer-explore-title">
          {/* Render the h2 element. */}
          <h2 id="footer-explore-title">Explore</h2>
          {/* Render the ul element. */}
          <ul>
            {/* Render one item for each entry, using stable keys to help React track them. */}
            {movieCategories.map((category) => (
              // Render the li element.
              <li key={category.id}><Link to={category.id === 'popular' ? '/' : `/?category=${category.id}`}>{category.label}</Link></li>
            ))}
            {/* Render the li element. */}
            <li><Link to="/favourites">Favourites</Link></li>
          </ul>
        </nav>
        {/* Render the movie credits area with accessible labelling. */}
        <section className="movie-credits" aria-labelledby="footer-credits-title">
          {/* Render the h2 element. */}
          <h2 id="footer-credits-title">Credits</h2>
          {/* Render the tmdb credit area. */}
          <a className="tmdb-credit" href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"><img src="/tmdb.svg" alt="The Movie Database (TMDB)" width="76" /></a>
          {/* Render the p element. */}
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </section>
      </div>
      {/* Render the footer bottom area. */}
      <div className="footer-bottom">
        {/* Render the p element. */}
        <p>© {new Date().getFullYear()} {appName}</p>
        {/* Render the a element. */}
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
