## Quick orientation

- This repository contains a single frontend React application built with Vite and Tailwind under `frontend/`.
- Tech stack: React (JSX), Vite dev server, Tailwind CSS, eslint. Routing lives in `react-router-dom` (see `frontend/src/routes.jsx`).

## Key files & where to make changes

- Entry: `frontend/src/main.jsx` — app bootstrapping and provider wiring.
- Routing: `frontend/src/routes.jsx` — modify to add pages or routes (react-router v7).
- Pages: `frontend/src/pages/` — top-level page components (e.g. `HomePage.jsx`).
- Reusable UI: `frontend/src/components/` — split into `common/` and `layout/`.
  - Examples: `frontend/src/components/common/TourCard.jsx`, `frontend/src/components/layout/TourCardDiv.jsx`.
- Styles: `frontend/src/index.css` and `frontend/tailwind.config.js` for Tailwind configuration.
- Static assets: `frontend/src/assets/images/`.

## How to run (exact commands)

Use the `frontend` package for local development and builds. From the repo root (bash):

```bash
cd frontend
npm install        # first time only
npm run dev        # starts Vite dev server (HMR)
npm run build      # produces production build (dist)
npm run preview    # preview build locally
npm run lint       # run eslint across the frontend
```

Notes: package.json uses `vite` for dev/build. There's an intentional `overrides` entry for `vite` to use `rolldown-vite`.

## Conventions and patterns specific to this repo

- File naming: components and pages use `.jsx` and default export functional components.
- Component grouping: UI shared across pages goes into `components/common`; page layout components and containers go into `components/layout`.
- Routing is centralized in `frontend/src/routes.jsx` — prefer editing/adding routes there instead of scattering route logic.
- Styling: prefer Tailwind utility classes in JSX. Global CSS (e.g., resets) lives in `index.css`.
- Linting: ESLint config at `frontend/eslint.config.js` — run `npm run lint` before commits.

## Integration points & external deps

- No backend is included in this repo root. If code needs to call servers, search for `fetch`, `axios`, or `api` in `frontend/src/` to find existing integration patterns.
- Main runtime deps live in `frontend/package.json`. Notable libs: `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `@heroicons/react`, `react-icons`.

## Small examples (how to change common tasks)

- Add a new page:

  1. Create `frontend/src/pages/NewPage.jsx` (default export React component).
  2. Import and register route in `frontend/src/routes.jsx` (follow existing route shape).

- Add a new shared UI component:
  1. Create `frontend/src/components/common/MyWidget.jsx`.

2.  Export as default and import in page or layout.

## What to watch for / gotchas discovered in the repo

- `vite` is overridden via `package.json` to `rolldown-vite` (see `overrides`) — if changing build tooling, validate this override.
- This project uses React 19+ and react-router v7 patterns — check `routes.jsx` for idiomatic usage (hooks/loader patterns may differ from earlier v6 code).
- Tailwind major version is present; changing Tailwind config can alter class names and purge behavior. Check `tailwind.config.js`.

## Where to look next

- `frontend/src/main.jsx` — confirm global providers (context, router).
- `frontend/src/routes.jsx` — primary place to add app routes.
- `frontend/package.json` & `frontend/README.md` — canonical scripts and developer notes.

If any part of this guidance is incomplete or you want me to include other repository areas (e.g., backend, CI), tell me which files or concerns to prioritize and I'll update this file.
