import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: 'worker/index.js',
    outDir: 'dist/server',
    emptyOutDir: true,
    rolldownOptions: { output: { entryFileNames: 'index.js', codeSplitting: false } },
  },
});
