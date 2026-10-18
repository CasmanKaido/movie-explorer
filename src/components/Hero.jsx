import Icon from './Icon.jsx';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true"><Icon name="film" size={110} /></div>
      <div className="hero-copy">
        <h1 id="hero-title">Find your next movie.</h1>
        <p>Explore films and keep your favourites together.</p>
        <a className="primary-button" href="#movies">Browse movies<Icon name="arrow" size={17} /></a>
      </div>
    </section>
  );
}
