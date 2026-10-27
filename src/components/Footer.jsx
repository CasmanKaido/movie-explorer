import { Link } from 'react-router';
import { appName } from '../config/env.js';
import { movieCategories } from '../config/categories.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-intro">
          <Link className="footer-brand" to="/">{appName}</Link>
          <p>Discover movies and keep your favourites in one place.</p>
        </div>
        <nav className="footer-navigation" aria-labelledby="footer-explore-title">
          <h2 id="footer-explore-title">Explore</h2>
          <ul>
            {movieCategories.map((category) => (
              <li key={category.id}><Link to={category.id === 'popular' ? '/' : `/?category=${category.id}`}>{category.label}</Link></li>
            ))}
            <li><Link to="/favourites">Favourites</Link></li>
          </ul>
        </nav>
        <section className="movie-credits" aria-labelledby="footer-credits-title">
          <h2 id="footer-credits-title">Credits</h2>
          <a className="tmdb-credit" href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"><img src="/tmdb.svg" alt="The Movie Database (TMDB)" width="76" /></a>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </section>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {appName}</p>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
