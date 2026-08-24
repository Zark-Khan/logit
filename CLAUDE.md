# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Standard Create React App (`react-scripts`) commands — no custom build tooling:

- `npm start` — dev server at http://localhost:3000 with hot reload
- `npm run build` — production build to `build/`
- `npm test` — Jest/RTL in watch mode via `react-scripts test` (no test files currently exist in the repo; testing libraries are installed as CRA defaults but unused)
- `npm run eject` — irreversible CRA eject; do not run unless explicitly asked

There is no lint script; CRA's built-in ESLint (`eslintConfig: extends react-app`) runs as part of `npm start`/`npm run build` and surfaces warnings in the console/terminal.

## Architecture

This is **Logit**, a care/home-care management admin dashboard (staff rostering, client care delivery, finance, reporting). It's a client-only React 19 SPA — **there is no backend/API integration anywhere**; all data is hardcoded mock data inline in components or config files (e.g. `src/components/reports/reportConfigs.js`). When implementing a feature, follow this pattern unless told otherwise: add/extend mock data in the component or a nearby config, don't invent API calls.

### Routing & layout shell

`src/routes/index.js` defines the entire route tree with `react-router-dom`. Routes are nested under layout components (`src/layouts/*`) that each wrap an `<Outlet />` with a shared chrome:
- `AuthLayout` — no navbar, wraps `/auth/*`
- `DashboardLayout` — shared `Navbar` (`src/components/dashboard/Navbar.jsx`), wraps all authenticated top-level sections (`/dashboard`, `/rostering`, `/care-delivery`, `/finance`, `/reports/*`)
- `StaffLayout` / `ClientsLayout` — nested inside `DashboardLayout`, used for the `/staff` and `/clients` section tabs (overview, all-staff/all-clients, etc.)

Detail pages (`StaffDetailPage`, `ClientDetailPage`) are routed directly under `DashboardLayout` at `/staff/all-staff/:id` and `/clients/all-clients/:id` — outside the `StaffLayout`/`ClientsLayout` tab shells.

### Feature module structure

`src/components/` is organized by business domain, not by component type: `allStaff/`, `allClients/`, `careDelivery/` (assessments, carePlans, incidents, medication, visits), `clientDetail/tabs/` and `staffDetail/tabs/` (per-tab subfolders for each detail-page tab), `finance/` (invoices, payments, payroll, modals), `reports/`, `dashboard/`, `auth/`. Each `pages/*.jsx` is typically a thin composition of one or more domain components/tabs.

Detail pages (`ClientDetailPage`, `StaffDetailPage`) follow a consistent nav + tab-content pattern: a `*DetailNav` component plus a `tabs/` directory of one folder/file per tab, switched on local state (not nested routes).

### State management

- **Zustand** (`src/store/`) for cross-component state that needs to persist across a flow — currently `useAssessmentStore.js` holds in-progress care-assessment form answers keyed by category, with `updateAssessment`/`toggleArrayField` actions. Prefer this pattern (one store per feature, plain `set`-based actions) over adding new global state solutions.
- Local component state (`useState`) is the default for everything else, including most "mock data" lists/tables.

### Theming

`src/theme.js` defines a single MUI `createTheme()` — custom palette keys (`text.grey`, `text.darkGrey`, `background.bgLight`, `background.bgOrange`, etc.) and a custom `typography.fontSizes` scale (`xs`/`base`/`sm`/`xl`) alongside standard MUI typography variants. Reuse these existing tokens instead of hardcoding colors/sizes in `sx` props. Font is Poppins throughout, including forced into `MuiInputBase` overrides.

### One-off codemod scripts

The repo root has several one-off Node scripts (`babel_refactor.js`, `clean_imports.js`, `refactor_textfields.js`) written with `@babel/parser`/`@babel/traverse` to bulk-refactor specific JSX files (e.g. converting inline labels to camelCase keys, stripping unused imports). These are throwaway/historical migration tools, not part of the app or build — don't wire them into `package.json` scripts, and treat them as reference only unless asked to run a similar refactor.
