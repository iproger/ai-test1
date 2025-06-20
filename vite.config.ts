import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use relative base so assets work on GitHub Pages under a subpath
  base: './',
  plugins: [react()],
});
