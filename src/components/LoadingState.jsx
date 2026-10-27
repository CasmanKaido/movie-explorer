// Announce loading to assistive technology while showing a spinner.
export default function LoadingState({ children }) {
  // Return the interface that React should display.
  return (
    // Render the empty movies loading state area.
    <div className="empty-movies loading-state" role="status">
      {/* Render the loading spinner area with accessible labelling. */}
      <span className="loading-spinner" aria-hidden="true" />
      {/* Render the p element. */}
      <p>{children}</p>
    </div>
  );
}
