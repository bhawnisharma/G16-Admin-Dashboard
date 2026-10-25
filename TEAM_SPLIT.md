# Team Split — G16

Four parts, one per teammate, matching the folders/comments in the code
(every file has an "Owner:" comment at the top). Each part maps to a
learning objective from the project brief so it's easy to explain in a
viva.

---

## 1. Bhawni — Setup + Layout
**Files:** `main.jsx`, `App.jsx`, `components/Sidebar.jsx`, `components/Topbar.jsx`, `index.css`, `App.css` (layout section)

- Scaffolds the app with Vite, sets up `BrowserRouter` so the app has
  multiple pages (Overview / Users / Settings).
- Builds the sidebar + topbar shell that every page sits inside.
- Owns the shared `collapsed`, `theme` and `role` state in `App.jsx` and
  passes it down as **props** to children — this is "prop drilling",
  the beginner-friendly alternative to Context API.
- Dark/light theme is done with a CSS variable file (`index.css`) plus
  one `useEffect` that sets `data-theme` on `<html>` and saves the
  choice to `localStorage`.

**Can explain:** why we didn't use Context API (not covered in class,
prop drilling is simpler to reason about at 3 levels deep), how
`NavLink`'s `isActive` highlights the current page.

---

## 2. Harshpreet — Overview + Charts
**Files:** `pages/Overview.jsx`, `components/KpiCard.jsx`, `components/Charts.jsx`

- KPI numbers (total users, male/female counts, average age) are
  **calculated from the data**, not hardcoded — uses `.filter()` and
  `.reduce()`.
- All 4 charts (line, bar, donut, stacked area) are drawn as plain SVG
  using basic math + `array.map()` — no Recharts/Chart.js, since that
  library integration is beyond the syllabus. Each chart component only
  takes numbers as props, so it doesn't know anything about "users".

**Can explain:** how an SVG `<polyline>`/`<rect>`/`<path>` is just
another element React can render from data, how a donut chart is drawn
with an SVG arc `path`, why `useMemo` wasn't needed (small dataset,
covered as a stretch idea only).

---

## 3. Manya — Data Grid
**Files:** `components/UserTable.jsx`, `utils/exportCsv.js`, `pages/Users.jsx` (table wiring)

- The reusable table: global search, one filter box per column,
  click-to-sort headers, pagination (8 rows/page), row selection with
  a "select all on this page" checkbox, and CSV export (selected rows,
  or everything visible if nothing is selected).
- `exportCsv.js` builds the CSV as a plain string and downloads it with
  `Blob` + `URL.createObjectURL` — no library needed.

**Can explain:** why sorting/filtering/pagination is done in this order
(filter → sort → slice), the difference between doing this on the
client vs. the server (see "server-side pagination" stretch goal —
useful for the "what breaks at 1 million rows?" interview question),
why the table is configured by a `columns` prop instead of being
copy-pasted for every data type.

---

## 4. Priyanshi — Forms + Settings
**Files:** `components/UserForm.jsx`, `pages/Settings.jsx`, `pages/Users.jsx` (add/edit wiring)

- `UserForm.jsx` is a controlled form (one `useState` object holding all
  fields) used for both **adding** and **editing** a user — the same
  component, just started with an empty object or an existing row.
- Basic validation (required fields, age > 0) before calling `onSave`.
- `Settings.jsx` reuses the `theme`/`role` props from `App.jsx` so
  toggling them from Settings updates the whole app immediately.

**Can explain:** what "controlled input" means (`value` + `onChange`),
why role-based UI (`+ Add user` only for admins) is not real security
on its own, how the Add/Edit modal is just conditional rendering
(`{editingUser && <UserForm .../>}`) rather than a routed page.

---

## Where this matches (and stops short of) the original brief

We kept the **KPI cards, 4 chart types, server-style data grid
features (search/filter/sort/paginate/select/export), role-based UI,
and a collapsible sidebar** from the brief — all reachable with
`useState`/`useEffect`/`useRef` + basic `react-router-dom`.

We deliberately **did not** add: Redux/Zustand, TanStack Table/Query,
Recharts/ApexCharts, the Context API, TypeScript, or a real Express +
MongoDB backend — those are listed as "stretch goals" / MERN-capstone
extensions in the brief, and are a good next step but go past what was
taught this term.

---

# v3 additions (new look + home page)

| Member | New work in v3 | Files |
|---|---|---|
| Bhawni | Routing for the landing page, loading screen (Promise + setTimeout), live clock and greeting, new sidebar with icons, sunset colour variables | `App.jsx`, `Sidebar.jsx`, `Topbar.jsx`, `LoadingScreen.jsx`, `index.css`, `orbit.css` (layout part) |
| Harshpreet | React home page (typing effect, counters, Card props, useRef scroll), chart recolouring, "Newest users" card | `pages/Home.jsx`, `home.css`, `Overview.jsx`, `Charts.jsx` |
| Manya | Data grid restyle: row hover, glowing active chips, highlighted row border | `orbit.css` (data grid part) |
| Priyanshi | Button and form restyle: gradient primary button, focus rings, modal glow, Settings page check in both themes | `orbit.css` (buttons/modal part), `Settings.jsx` |

Be ready to explain your own part in the viva. Change one small thing in it (a word, a colour, a number) so you know where everything lives.

---

# v4 changes
- Context API added: `context/AppContext.jsx` now holds theme and role (Bhawni). Topbar, Settings and Home read it with `useContext`, so the old prop drilling for theme/role is gone.
- Overview has a "Last 3 / 5 / 7 days" selector for the charts (Harshpreet).
- Code comments now only say who owns each file.
