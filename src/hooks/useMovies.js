// Import { useEffect, useState } from react.
import { useEffect, useState } from 'react';
// Import { getMovies } from ../services/movies.js.
import { getMovies } from '../services/movies.js';

// Fetch a fresh catalogue when the search, filters or retry counter changes.
export default function useMovies(query = '', refreshKey = '', category = 'popular', genre = '', timeWindow = 'week') {
  // Keep movies in React state so changes update the screen.
  const [movies, setMovies] = useState([]);
  // Keep genres in React state so changes update the screen.
  const [genres, setGenres] = useState([]);
  // Keep loading in React state so changes update the screen.
  const [loading, setLoading] = useState(true);
  // Keep error in React state so changes update the screen.
  const [error, setError] = useState('');
  // Keep attempt in React state so changes update the screen.
  const [attempt, setAttempt] = useState(0);

  // Run this effect when its listed dependencies change; return cleanup for the previous run.
  useEffect(() => {
    // Create a controller so an outdated request can be cancelled.
    const controller = new AbortController();
    // Update movies so React displays the new value.
    setMovies([]);
    // Update loading so React displays the new value.
    setLoading(true);
    // Update error so React displays the new value.
    setError('');

    // Start the catalogue request with the current filters and cancellation signal.
    getMovies(query, controller.signal, { category, genre, timeWindow })
      // Apply a successful response only while this request is still current.
      .then((results) => {
        // Ignore cancelled requests so old results cannot replace the current view.
        if (!controller.signal.aborted) {
          // Update movies so React displays the new value.
          setMovies(results.movies);
          // Update genres so React displays the new value.
          setGenres(results.genres);
        }
      })
      // Show the failure message unless this request was deliberately cancelled.
      .catch((failure) => { if (!controller.signal.aborted) setError(failure.message); })
      // Stop the loading indicator after the current request settles.
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    // Cancel the previous request when its inputs change or this component unmounts.
    return () => controller.abort();
  // Re-run when these inputs change; cleanup cancels the previous request.
  }, [query, attempt, refreshKey, category, genre, timeWindow]);

  // Return the validated values for the caller to use.
  return { movies, genres, loading, error, retry: () => setAttempt((current) => current + 1) };
}
