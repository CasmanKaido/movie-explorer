// Fetch JSON with cancellation, a time limit and readable errors.
export async function fetchJson(url, { signal, errorMessage, notFoundMessage }) {
  // Attempt this operation and handle failures in the catch block.
  try {
    // Wait for the upstream HTTP response.
    const response = await fetch(url, {
      // Set signal.
      signal: AbortSignal.any([signal, AbortSignal.timeout(15000)].filter(Boolean)),
      // Set headers.
      headers: { accept: 'application/json' },
    });

    // Distinguish a missing movie from a temporary service failure.
    if (notFoundMessage && (response.status === 400 || response.status === 404)) {
      // Prepare error for the steps below.
      const error = new Error(notFoundMessage);
      // Run error.notFound = true.
      error.notFound = true;
      // Report this failure to the caller so the interface can show an error.
      throw error;
    }
    // Treat an unsuccessful HTTP response as a request failure.
    if (!response.ok) throw new Error(errorMessage);
    // Parse the successful response body as JSON.
    return await response.json();
  } catch (error) {
    // Preserve intentional cancellation and not-found errors for the caller.
    if (signal?.aborted || error.notFound) throw error;
    // Report this failure to the caller so the interface can show an error.
    throw new Error(errorMessage);
  }
}
