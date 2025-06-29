# CPU Simulator Dashboard

This project implements a browser-based CPU simulator inspired by Windows Task Manager and macOS Activity Monitor. It is built with **React**, **TypeScript**, **Tailwind CSS**, **Bootstrap 5**, and **Recharts**.

The simulator visualises logical threads as animated boxes, allows running tasks with different profiles, and models basic thermal and scheduling behaviour. All state is kept in the browser so the demo works offline and can be deployed using GitHub Pages.

## Features

- Select from predefined CPU models or create custom ones
- Responsive grid showing per-thread utilisation with smooth animations
- Task form supporting category, preset, core count and priority
- Task cards with progress and live performance metrics
- Real‑time execution charts using Recharts
- Off‑canvas settings drawer with theme and throttling options
- Simulation loop modelling load, temperature and simple scheduling

## Repository Structure

```
/
├── index.html             # Built entry point served by GitHub Pages
├── assets/                # Bundled JS/CSS from Vite
├── src/                   # React application source
│   ├── components/        # UI components like CpuGrid and TaskForm
│   ├── agents/            # Core, Task and Scheduler logic
│   ├── models/            # CPU model JSON files
│   ├── config/            # Task profiles and types
│   ├── state/             # React context and store helpers
│   └── utils/             # Simulation utilities
└── vite.config.ts
```

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

During development open `src/index.html` or the Vite dev URL. The production build outputs `index.html` and an `assets` folder at the repository root so GitHub Pages can serve the app from `/`.

Build for GitHub Pages:

```bash
npm run build
```

This runs `vite build` with `base: './'` and `outDir: '.'` so all files are written to the project root. Commit the generated `index.html` and `assets` folder when deploying.

