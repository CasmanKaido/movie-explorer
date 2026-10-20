import Icon from './Icon.jsx';
import { useFavourites } from '../context/FavouritesContext.jsx';

export default function FavouriteButton({ movie, compact = false }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(movie.id);

  return (
    <button type="button" className={`favourite-button ${compact ? 'compact' : ''} ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Add'} ${movie.title} ${saved ? 'from' : 'to'} favourites`} aria-pressed={saved} onClick={() => toggleFavourite(movie)}>
      <Icon name="heart" size={compact ? 18 : 17} />
      {!compact && <span>{saved ? 'Saved to favourites' : 'Add to favourites'}</span>}
    </button>
  );
}
