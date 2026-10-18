import { appName } from '../config/env.js';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center bg-[#101113] px-6 py-16 text-stone-100 sm:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-12 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">{appName}</p>
        <p className="mb-4 text-sm text-stone-400">A new movie discovery experience</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">Your next great watch starts here.</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-400">Explore movies, discover the details, and keep your favourites together.</p>
        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-sm text-stone-300">Project foundation ready</p>
          <p className="mt-2 text-sm text-stone-500">The movie catalogue, search, and favourites arrive in the next milestones.</p>
        </div>
      </div>
    </main>
  );
}
