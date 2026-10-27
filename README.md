# Movie Explorer

A movie discovery app for finding films, checking their details and keeping a list of favourites. Movie information and artwork come from TMDB.

[Live app](https://movie-explorer-lovat-omega.vercel.app)

## Features

- Browse Popular, Top Rated, Now Playing and Upcoming movies.
- Explore daily or weekly Trending movies and filter by genre.
- Search by title using the search button or Enter.
- Open a movie to see its overview, rating, release date, runtime, genres and production information.
- Save and remove favourites from movie cards or the details page.
- Keep favourites after refreshing or closing the browser.
- Loading indicators, retry controls and fallbacks for unavailable artwork.
- Responsive layouts for smaller screens.

Favourites are stored in localStorage. They belong to the browser and site where they were saved, so they do not sync across devices. Clearing the site's browser data removes them. There is no account system or database.

## Stack

React, Vite, Tailwind CSS, custom CSS and React Router. The server handlers use JavaScript and the Fetch API. Vercel hosts the app and its API endpoints.

## Run locally

Use Node.js 24 and npm.

```bash
git clone https://github.com/CasmanKaido/movie-explorer.git
cd movie-explorer
npm ci
cp .env.example .env.local
```

Get an **API Read Access Token** from [TMDB's API settings](https://www.themoviedb.org/settings/api), then add it to `.env.local`:

```dotenv
VITE_APP_NAME="Movie Explorer"
TMDB_READ_TOKEN=your_tmdb_read_access_token
```

`VITE_APP_NAME` is optional. `TMDB_READ_TOKEN` is required to load movies and must stay server-side. Do not prefix it with `VITE_` or commit the real token. Vite exposes variables beginning with `VITE_` to the browser.

Start the app:

```bash
npm run dev
```

Open the URL shown in the terminal. Restart the development server after changing environment variables. Without a valid token, the app displays a movie-service error.

## How the API works

The browser calls our own endpoints:

| Endpoint | Purpose |
| --- | --- |
| `/api/movies` | Browse categories, search titles and discover movies by genre |
| `/api/movie?id=27205` | Load one movie's details |

The handlers in `server/` validate requests, call TMDB using the server-only token and return the fields used by the interface. Vite serves these endpoints during local development and preview; the files in `api/` expose them on Vercel.

## Build and preview

```bash
npm run build
npm run preview
```

The build generates the client assets in `dist/` and a Worker bundle for the separate hosted preview. For local preview, keep the token in `.env.local`.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Select the Vite framework preset, `npm run build` as the build command and `dist` as the output directory.
3. Add `TMDB_READ_TOKEN` in the project's environment variables for each environment you use. Optionally add `VITE_APP_NAME`.
4. Deploy the project. Redeploy after changing environment variables.

The API entry points are in `api/`. The existing `vercel.json` rewrites let movie details and favourites pages open directly or survive a refresh.

## Project structure

```text
api/            Vercel API entry points
server/         TMDB request handlers and response mapping
src/
  components/   Reusable interface components
  config/       App name and movie categories
  context/      Shared favourites state
  hooks/        Movie fetching and request state
  pages/        Browse, details and favourites pages
  services/     Browser requests to our API
  styles/       Global and responsive styles
  utils/        Storage and formatting helpers
public/         Static assets, including the TMDB logo
worker/         Entry point for the separate hosted preview
scripts/        Build script
```

## Credits

Movie data and artwork are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie Explorer provides movie information; it does not stream full movies.
