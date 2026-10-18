import Icon from './Icon.jsx';

export default function SearchArea() {
  return (
    <div className="search-area" role="search" aria-label="Movie search">
      <Icon name="search" size={17} />
      <label className="sr-only" htmlFor="movie-search">Search movies</label>
      <input id="movie-search" type="search" placeholder="Search" disabled aria-describedby="search-note" />
      <button className="search-button" type="button" disabled aria-label="Search movies"><Icon name="arrow" size={17} /></button>
      <span id="search-note" className="sr-only">Search is not available yet.</span>
    </div>
  );
}
