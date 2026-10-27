import { useEffect, useState } from 'react';
import { getMovies } from '../services/movies.js';

export default function useMovies(query = '', refreshKey = '', category = 'popular', genre = '', timeWindow = 'week') {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setMovies([]);
    setLoading(true);
    setError('');

    getMovies(query, controller.signal, { category, genre, timeWindow })
      .then((results) => {
        if (!controller.signal.aborted) {
          setMovies(results.movies);
          setGenres(results.genres);
        }
      })
      .catch((failure) => { if (!controller.signal.aborted) setError(failure.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    return () => controller.abort();
  }, [query, attempt, refreshKey, category, genre, timeWindow]);

  return { movies, genres, loading, error, retry: () => setAttempt((current) => current + 1) };
}
