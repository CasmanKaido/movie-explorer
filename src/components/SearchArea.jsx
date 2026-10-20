import Icon from './Icon.jsx';

export default function SearchArea({ value, onChange, onSearch }) {
  function submitSearch(event) {
    event.preventDefault();
    onSearch(value.trim());
  }

  function clearSearch() {
    onChange('');
    onSearch('');
  }

  return (
    <form className="search-area" role="search" aria-label="Movie search" onSubmit={submitSearch}>
      <Icon name="search" size={17} />
      <label className="sr-only" htmlFor="movie-search">Search movies</label>
      <input id="movie-search" type="search" placeholder="Search movies" maxLength={100} value={value} onChange={(event) => onChange(event.target.value)} />
      {value && <button className="search-clear" type="button" onClick={clearSearch} aria-label="Clear search"><Icon name="close" size={15} /></button>}
      <button className="search-button" type="submit" aria-label="Search movies"><Icon name="arrow" size={17} /></button>
    </form>
  );
}
