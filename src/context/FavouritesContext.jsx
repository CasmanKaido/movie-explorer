import { createContext, useContext, useEffect, useState } from 'react';
import { readFavourites, writeFavourites, toggleFavourite } from '../utils/favourites.js';

export const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try { return readFavourites(window.localStorage); }
    catch { return []; }
  });
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    try {
      writeFavourites(window.localStorage, favourites);
      setStorageError('');
    } catch {
      setStorageError('Your favourites couldn’t be saved on this device. They will stay available until you refresh or close this page.');
    }
  }, [favourites]);

  const value = {
    favourites,
    storageError,
    isFavourite: (id) => favourites.some((movie) => movie.id === id),
    toggleFavourite: (movie) => setFavourites((current) => toggleFavourite(current, movie)),
  };

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error('useFavourites must be used inside FavouritesProvider.');
  return context;
}
