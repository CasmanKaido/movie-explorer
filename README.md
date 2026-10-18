# Movie Explorer

A movie discovery application built with React, Vite, and Tailwind CSS for a milestone-based development assignment.

## Current status

The project setup milestone is implemented. The starter page is a foundation, not the finished movie application. No movie API is connected yet.

## Run locally

Use Node.js 24 LTS and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To customise the public app name, copy `.env.example` to `.env.local` and edit `VITE_APP_NAME`. The app works without an environment file.

## Production build

```bash
npm run build
npm run preview
```

Build output is written to `dist/`.

## Folder structure

```text
src/
  components/   Shared UI components
  config/       Public environment configuration
  hooks/        Reusable React hooks
  pages/        Page components
  services/     Movie API requests (upcoming)
  styles/       Global styles and Tailwind import
  utils/        Shared utility functions
  App.jsx       Application entry component
  main.jsx      React bootstrap
```

## Assignment milestones

- [x] React + Vite + Tailwind CSS
- [x] GitHub repository
- [x] Folder structure
- [x] Environment configuration template
- [x] Initial README
- [ ] Application layout
- [ ] Movie API integration
- [ ] Movie search
- [ ] Movie details and React Router
- [ ] Favourites persisted using localStorage
- [ ] Loading, empty, error, and missing-poster states
- [ ] Desktop, tablet, and mobile verification
- [ ] Vercel deployment and presentation

## Configuration safety

Environment files are ignored by Git; `.env.example` contains placeholders only. Vite embeds all `VITE_` values in the browser bundle, so they cannot hold private secrets. Choose the API and its credential strategy during the API milestone; use server-side configuration for credentials that must remain private.

## Deployment plan

The final submission will use Vercel with the Vite preset, `npm run build` as the build command, and `dist` as the output directory. Add route fallback configuration when React Router is introduced. No deployment has been made yet.
