# Agent Instructions

This repository contains a React + TypeScript project built with Vite and Tailwind CSS.

- **Build Output**: The production build must output directly to the project root. Run `npm run build` which internally executes `vite build --outDir .`. This generates `index.html` and an `assets/` directory at the repository root. These files should remain under version control so GitHub Pages can serve them.
- **Development**: Use `npm run dev` during local development. It temporarily copies `index.dev.html` to `index.html` and starts the Vite dev server.
- **No `dist` Directory**: Do not create or use a `dist/` folder. All compiled files must stay in the root to work with GitHub Pages.
- **Testing**: Before committing, run `npm run build` to ensure the project builds successfully. Optionally run `npm run dev` to verify the development environment starts.

Follow these guidelines when making changes to keep the project compatible with GitHub Pages.
