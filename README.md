# Movie Explorer

A movie discovery app built with React, Vite and Tailwind CSS.

Still in development. The basic setup is ready; browsing movies, search, movie details and favourites are next.

## Getting started

Use Node.js 24 and npm.

```bash
git clone https://github.com/CasmanKaido/movie-explorer.git
cd movie-explorer
npm ci
npm run dev
```

Open the local URL shown in your terminal.

## Environment variables

The app runs without an environment file. To change the app name, copy `.env.example` to `.env.local` and update `VITE_APP_NAME`.

Movie API configuration will be added when the API is connected. Don't put private credentials in `VITE_` variables — these are included in the browser bundle.

## Build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Project structure

```text
src/
  components/   Shared UI
  config/       App configuration
  hooks/        Custom React hooks
  pages/        Page components
  services/     API calls
  styles/       Global CSS
  utils/        Helper functions
```
