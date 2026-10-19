import { useEffect, useState } from 'react';
import { getMovies } from '../services/movies.js';

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    getMovies(controller.signal)
      .then((results) => { if (!controller.signal.aborted) setMovies(results); })
      .catch((failure) => { if (!controller.signal.aborted) setError(failure.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    return () => controller.abort();
  }, [attempt]);

  return { movies, loading, error, retry: () => setAttempt((current) => current + 1) };
}
