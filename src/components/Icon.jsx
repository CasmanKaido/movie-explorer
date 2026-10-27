// Store SVG drawing commands for each supported icon.
const paths = {
  // Set search.
  search: 'm21 21-4.4-4.4 M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  // Set heart.
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  // Set arrow.
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  // Set home.
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z',
  // Set discover.
  discover: 'm21 3-6 12-12 6L9 9l12-6Z M9 9l6 6',
  // Set film.
  film: 'M4 3h16v18H4V3Z M8 3v18M16 3v18 M4 8h4m-4 8h4m8-8h4m-4 8h4',
  // Set bookmark.
  bookmark: 'M6 3h12v18l-6-4-6 4V3Z',
  // Set menu.
  menu: 'M4 6h16M4 12h16M4 18h16',
  // Set close.
  close: 'm6 6 12 12M6 18 18 6',
  // Set star.
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z',
};

// Draw a named icon from the SVG paths below.
export default function Icon({ name, size = 20, ...props }) {
  // Return the interface that React should display.
  return (
    // Render the svg element with accessible labelling.
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {/* Use the selected SVG path to draw the icon shape. */}
      <path d={paths[name]} />
    </svg>
  );
}
