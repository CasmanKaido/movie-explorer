import { useEffect, useState } from 'react';
import { getMovie } from '../services/movie.js';

export default function useMovie(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setMovie(null);
    setLoading(true);
    setError(null);

    getMovie(id, controller.signal)
      .then((result) => { if (!controller.signal.aborted) setMovie(result); })
      .catch((failure) => { if (!controller.signal.aborted) setError(failure); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    return () => controller.abort();
  }, [id, attempt]);

  return { movie, loading, error, retry: () => setAttempt((current) => current + 1) };
}
