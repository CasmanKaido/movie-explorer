// Import { createContext, useContext, useEffect, useState } from react.
import { createContext, useContext, useEffect, useState } from 'react';
// Import { readFavourites, writeFavourites, toggleFavourite } from ../utils/favourites.js.
import { readFavourites, writeFavourites, toggleFavourite } from '../utils/favourites.js';

// Prepare favourites context for the steps below.
export const FavouritesContext = createContext(null);

// Share saved movies with every page and persist changes on this device.
export function FavouritesProvider({ children }) {
  // Keep favourites in React state so changes update the screen.
  const [favourites, setFavourites] = useState(() => {
    // Attempt this operation and handle failures in the catch block.
    try { return readFavourites(window.localStorage); }
    catch { return []; }
  });
  // Keep storage error in React state so changes update the screen.
  const [storageError, setStorageError] = useState('');

  // Run this effect when its listed dependencies change; return cleanup for the previous run.
  useEffect(() => {
    // Attempt this operation and handle failures in the catch block.
    try {
      // Save the current collection to this browser’s localStorage.
      writeFavourites(window.localStorage, favourites);
      // Update storage error so React displays the new value.
      setStorageError('');
    } catch {
      // Update storage error so React displays the new value.
      setStorageError('Your favourites couldn’t be saved on this device. They will stay available until you refresh or close this page.');
    }
  }, [favourites]);

  // Expose the collection, storage warning and save helpers to child components.
  const value = {
    favourites,
    storageError,
    // Set is favourite.
    isFavourite: (id) => favourites.some((movie) => movie.id === id),
    // Set toggle favourite.
    toggleFavourite: (movie) => setFavourites((current) => toggleFavourite(current, movie)),
  };

  // Return the interface that React should display.
  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

// Read the shared collection and require its provider to be present.
export function useFavourites() {
  // Read the nearest favourites provider.
  const context = useContext(FavouritesContext);
  // Explain incorrect hook usage instead of allowing a null context to fail later.
  if (!context) throw new Error('useFavourites must be used inside FavouritesProvider.');
  // Give this component access to the shared favourites state.
  return context;
}
