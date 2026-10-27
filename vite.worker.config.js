// Import { defineConfig } from vite.
import { defineConfig } from 'vite';

export default defineConfig({
  // Set build.
  build: {
    // Set ssr.
    ssr: 'worker/index.js',
    // Set out dir.
    outDir: 'dist/server',
    // Set empty out dir.
    emptyOutDir: true,
    // Set rolldown options.
    rolldownOptions: { output: { entryFileNames: 'index.js', codeSplitting: false } },
  },
});
