export default function LoadingState({ children }) {
  return (
    <div className="empty-movies loading-state" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
