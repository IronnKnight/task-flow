# Task Flow

Task Flow is a feature-oriented React application for authenticated task management.
It includes login/logout, task CRUD, status filters, route guards, and persistent local storage.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Redux Toolkit + React Redux
- React Router
- CSS Modules + global design tokens (`src/styles/globals.css`)
- ESLint (flat config)

## Core Features

- Email-based login flow (mocked) with persisted session.
- Protected dashboard route and guest-only login route.
- Create, update status, filter, and delete tasks.
- Task data persistence in `localStorage`.
- Runtime validation of persisted auth/task payloads to guard against corrupted storage.
- Granular async UX states:
  - fetch state for initial list loading
  - create state for form submission
  - per-task update/delete loading controls
  - operation-scoped error surfaces (`fetchError`, `createError`, `mutationError`)

## Routing

Defined in `src/app/router.tsx`:

- `/` -> redirects to `/dashboard`
- `/login` -> wrapped by `GuestRoute`
- `/dashboard` -> wrapped by `ProtectedRoute`
- `*` -> redirects to `/`

Route guards are organized in `src/app/routes` with a barrel export.

## Architecture

The project follows a feature-first structure:

- `src/app` - app shell (router, providers, store, typed hooks, route guards)
- `src/features/auth` - auth domain (API, slice, types, UI components)
- `src/features/tasks` - tasks domain (API, slice, types, UI components)
- `src/pages` - page composition (`LoginPage`, `DashboardPage`)
- `src/shared` - reusable UI/layout/utilities (`Button`, `Input`, `Spinner`, `AppLayout`, `Header`, helpers)
- `src/styles` - global CSS variables and base styles

Barrel exports are used in feature and shared layers for cleaner imports.

## State Management Notes

- Store setup lives in `src/app/store.ts` with two slices: `auth`, `tasks`.
- `AppProviders` dispatches `loadCurrentUser` on mount to restore auth state.
- Tasks use `createEntityAdapter` for normalized list handling.
- Async workflows are modeled via `createAsyncThunk` in both domains.

## Local Storage Behavior

- Auth key: `task-flow-auth-user`
- Tasks key: `task-flow-tasks`
- Stored data is validated with type predicates before use.
- Invalid payloads are discarded and cleaned from storage.

## UI/Styling

- Dark-first design token system is defined in `src/styles/globals.css`.
- Components use CSS Modules for scoped styling.
- Shared primitives (`Button`, `Input`, `Spinner`) are reused across features.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - type-check and production build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build locally

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open the local URL shown in terminal (typically `http://localhost:5173`).
