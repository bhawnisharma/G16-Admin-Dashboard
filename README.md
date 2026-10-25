# Admin Analytics Dashboard — G16 (Project 9)

A React + Vite rebuild of the Admin Analytics Dashboard, kept strictly to
**HTML, CSS, JavaScript and the basics of React** we covered in class
(`useState`, `useEffect`, `useRef`, mapping arrays to JSX, and
`react-router-dom`'s `BrowserRouter` / `Routes` / `Route`). Context API (for theme and role),
no third-party chart or table libraries, no custom hooks - see
`TEAM_SPLIT.md` for exactly why each part is built the way it is.

It reproduces the same screens as our original single-page HTML/CSS/JS
prototype (sidebar, KPI cards, 4 charts, searchable/filterable data grid)
but as a proper multi-page React app.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for submission / deployment

```bash
npm run build
npm run preview   # serves the production build locally
```

## Pages

- **Home** (`/`) - landing page: typing effect, live counters, feature cards, team footer (v3)

- **Overview** (`/overview`) — KPI cards + 4 hand-drawn SVG charts + newest users (line, bar, donut, stacked area)
- **Users** (`/users`) — the data grid: search, per-column filters, sorting, pagination, row selection, CSV export, Add/Edit user
- **Settings** (`/settings`) — theme toggle (dark/light) and role toggle (admin/viewer)

## Folder structure

```
src/
  components/   Sidebar, Topbar, KpiCard, Charts, UserTable, UserForm
  pages/        Overview, Users, Settings
  data/         mockUsers.js (fake data, swap for a real API in the stretch goal)
  utils/        exportCsv.js
```

See `TEAM_SPLIT.md` for who owns which part and what to say about it.
