# CPU Simulator Dashboard

This demo implements a small portion of the CPU dashboard specification. It uses Bootstrap 5 for styling along with Tailwind utilities and is built with React, TypeScript, Vite and Recharts.

Features:

- Select between a few predefined CPU models
- Visual grid of threads with animated load bars
- Add tasks with type, core count and priority
- Task list with progress bars
- Simple real-time load charts

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

During development open `src/index.html` in the browser. The production build outputs `index.html` and the `assets` folder at the repository root so it can be served via GitHub Pages.
The Vite config sets `base: './'` so asset URLs remain relative and work from any subpath.

Build for GitHub Pages:

```bash
npm run build
```
