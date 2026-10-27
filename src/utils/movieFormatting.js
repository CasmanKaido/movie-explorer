// Format a valid release date consistently in UTC.
export function formatReleaseDate(value) {
  // Show the unavailable label when no release date was supplied.
  if (!value) return 'Release date unavailable';
  // Parse the date at midnight UTC to avoid local timezone shifts.
  const date = new Date(`${value}T00:00:00Z`);
  // Handle malformed dates without displaying an invalid date.
  if (Number.isNaN(date.getTime())) return 'Release date unavailable';
  // Display day, abbreviated month and year using British English and UTC.
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

// Convert a positive runtime in minutes to hours and remaining minutes.
export function formatRuntime(minutes) {
  // Treat absent, non-numeric or non-positive runtimes as unavailable.
  if (!Number.isFinite(minutes) || minutes <= 0) return 'Runtime unavailable';
  // Count the complete hours in the runtime.
  const hours = Math.floor(minutes / 60);
  // Keep the minutes left after the complete hours.
  const remaining = minutes % 60;
  // Omit empty units and join the remaining hours and minutes with a space.
  return [hours ? `${hours}h` : '', remaining ? `${remaining}m` : ''].filter(Boolean).join(' ');
}
