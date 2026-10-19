import { appName } from '../config/env.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-heading"><span>{appName}</span><a href="#home">Back to top ↑</a></div>
      <section className="movie-credits" aria-label="Credits">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"><img src="/tmdb.svg" alt="TMDB" width="76" /></a>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </section>
    </footer>
  );
}
