# Development Instructions

## Build and Deployment Policy
- The application must always build into the repository root for GitHub Pages.
- Use the following **vite.config.ts**:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '.',
    emptyOutDir: false
  }
});
```

- The build version must be visible in the UI. Inject the version from `package.json` using the `VITE_APP_VERSION` variable.

## Testing Requirements

All changes must pass unit and integration tests.

### Unit Tests
- Use Vitest with `@testing-library/react`.
- Each core component must have a corresponding `.test.tsx` file covering rendering and interaction.

### Integration and E2E Tests
- Use Playwright to simulate real user interaction.
- Tests must verify that the build version is visible, the CPU grid renders, task management works, and the layout responds correctly on iPad landscape (1024×768) and iPhone portrait (390×844).

## Pre-Push Validation
- Run `npm run test && npm run build` before pushing.
- Add the following scripts to `package.json`:

```json
"scripts": {
  "build": "vite build --emptyOutDir=false --outDir=.",
  "test": "vitest run && playwright test",
  "prepush": "npm run test && npm run build"
}
```

## GitHub Pages Deployment
- GitHub Pages serves from the root of the branch. Do not use custom deployment scripts.
- Keep `index.html` and assets in the repository root.
