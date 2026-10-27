// Import Icon from ./Icon.jsx.
import Icon from './Icon.jsx';
// Import { useFavourites } from ../context/FavouritesContext.jsx.
import { useFavourites } from '../context/FavouritesContext.jsx';

// Toggle this movie in the shared saved collection.
export default function FavouriteButton({ movie, compact = false }) {
  // Read the shared favourites collection and its save controls.
  const { isFavourite, toggleFavourite } = useFavourites();
  // Read or normalize the saved movie data before using it.
  const saved = isFavourite(movie.id);

  // Return the interface that React should display.
  return (
    // Provide a keyboard-accessible button and run its click or submit action.
    <button type="button" className={`favourite-button ${compact ? 'compact' : ''} ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Add'} ${movie.title} ${saved ? 'from' : 'to'} favourites`} aria-pressed={saved} onClick={() => toggleFavourite(movie)}>
      {/* Draw the decorative icon using the requested name and size. */}
      <Icon name="heart" size={compact ? 18 : 17} />
      {/* Show this content only when its condition is met. */}
      {!compact && <span>{saved ? 'Saved to favourites' : 'Add to favourites'}</span>}
    </button>
  );
}
