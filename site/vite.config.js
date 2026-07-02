import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from the GitHub Pages project subpath: https://<user>.github.io/blazor-ag-grid/
// `base` makes every emitted asset URL resolve under that subpath, and exposes it
// to the app as import.meta.env.BASE_URL (used to locate the embedded /demo).
export default defineConfig({
  base: '/blazor-ag-grid/',
  plugins: [react()],
});
