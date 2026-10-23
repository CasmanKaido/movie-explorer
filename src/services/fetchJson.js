export async function fetchJson(url, { signal, errorMessage, notFoundMessage }) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(15000)].filter(Boolean)),
      headers: { accept: 'application/json' },
    });

    if (notFoundMessage && (response.status === 400 || response.status === 404)) {
      const error = new Error(notFoundMessage);
      error.notFound = true;
      throw error;
    }
    if (!response.ok) throw new Error(errorMessage);
    return await response.json();
  } catch (error) {
    if (signal?.aborted || error.notFound) throw error;
    throw new Error(errorMessage);
  }
}
