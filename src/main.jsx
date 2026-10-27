// Import React from react.
import React from 'react';
// Import ReactDOM from react-dom/client.
import ReactDOM from 'react-dom/client';
// Import App from ./App.jsx.
import App from './App.jsx';
// Import { FavouritesProvider } from ./context/FavouritesContext.jsx.
import { FavouritesProvider } from './context/FavouritesContext.jsx';
// Import { BrowserRouter } from react-router.
import { BrowserRouter } from 'react-router';
// Import the styles from ./styles/index.css.
import './styles/index.css';

// Mount the React application into the root element in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  // Render the React.StrictMode element.
  <React.StrictMode>
    {/* Render the FavouritesProvider element. */}
    <FavouritesProvider>
      {/* Render the BrowserRouter element. */}
      <BrowserRouter><App /></BrowserRouter>
    </FavouritesProvider>
  </React.StrictMode>,
);
