// Import { useEffect, useState } from react.
import { useEffect, useState } from 'react';
// Import { getMovie } from ../services/movie.js.
import { getMovie } from '../services/movie.js';

// Fetch movie details again when the ID or retry counter changes.
export default function useMovie(id) {
  // Keep movie in React state so changes update the screen.
  const [movie, setMovie] = useState(null);
  // Keep loading in React state so changes update the screen.
  const [loading, setLoading] = useState(true);
  // Keep error in React state so changes update the screen.
  const [error, setError] = useState(null);
  // Keep attempt in React state so changes update the screen.
  const [attempt, setAttempt] = useState(0);

  // Run this effect when its listed dependencies change; return cleanup for the previous run.
  useEffect(() => {
    // Create a controller so an outdated request can be cancelled.
    const controller = new AbortController();
    // Update movie so React displays the new value.
    setMovie(null);
    // Update loading so React displays the new value.
    setLoading(true);
    // Update error so React displays the new value.
    setError(null);

    // Start the details request for this ID with cancellation support.
    getMovie(id, controller.signal)
      // Apply a successful response only while this request is still current.
      .then((result) => { if (!controller.signal.aborted) setMovie(result); })
      // Show the failure message unless this request was deliberately cancelled.
      .catch((failure) => { if (!controller.signal.aborted) setError(failure); })
      // Stop the loading indicator after the current request settles.
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    // Cancel the previous request when its inputs change or this component unmounts.
    return () => controller.abort();
  // Re-run when these inputs change; cleanup cancels the previous request.
  }, [id, attempt]);

  // Return the validated values for the caller to use.
  return { movie, loading, error, retry: () => setAttempt((current) => current + 1) };
}
