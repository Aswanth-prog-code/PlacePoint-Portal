# PlacePoint UI redesign notes

## Goal
Replace the previous dark sidebar and purple dashboard styling with the requested **calm editorial** visual system. This is a presentation redesign: existing page content, data, APIs, coding execution logic, scoring and question banks remain in place.

## Files changed

| Exact path | Goal |
|---|---|
| `client/src/index.css` | Central design tokens, base typography, focus treatment and reduced-motion support. |
| `client/src/App.css` | Replace the previous visual rules with organized styles for layout, navigation, cards, forms, learning pages, company pages and responsive breakpoints. |
| `client/index.html` | Load Fraunces and Inter from Google Fonts and update the browser theme color. |
| `client/src/App.jsx` | Replace the left sidebar with desktop top navigation, tablet menu, mobile bottom tabs, candidate menu and footer LinkedIn text link. Preserve all existing routes and redirects. Save the most recently visited path as `placepoint-last-path`. |
| `client/src/pages/Dashboard.jsx` | Add the requested greeting, localStorage-backed stat cards, continue card and data-derived learning-area counts. |
| `client/src/pages/AuthLogin.jsx` | Add split brand/form layout, CSS illustration, practice points, password visibility toggle and accessible error/status banners. Existing login request and fields remain unchanged. |
| `client/src/pages/ProfileSetup.jsx` | Group the same registration fields into Account, Academic and Target companies sections with a visual progress indicator. Existing validation and submit logic remain unchanged. |

## Assumptions
- The source is the latest `PlacePoint-Final-Fixes.zip` supplied in this conversation.
- The existing six navigation destinations are the main links on desktop, tablet and mobile.
- The requested new `placepoint-last-path` key is the only new localStorage key. Existing authentication and progress keys are not renamed or removed by this redesign.
- Dashboard statistics are read from the existing student-scoped keys: `placepoint-coding-completed:<email>`, `placepoint-aptitude-results:<email>` and `placepoint-company-progress:<email>`.
- The company count and preparation category count are derived from `companyBank` and `categoryInfo`; selected programming language count comes from the saved candidate profile.
- Google Fonts are loaded from Google Fonts, so the custom fonts require an internet connection. System fallbacks are defined.
- No npm package was added.

## What changed in the interface

### Navigation
- Desktop (1100px and wider): PlacePoint wordmark, six main links and a candidate profile menu in a sticky top bar.
- Tablet (768px–1099px): top bar remains, with the six links collapsed into a menu button.
- Mobile (below 768px): fixed bottom navigation with an icon and visible label for every destination.
- `NavLink` supplies `aria-current="page"` on the active destination. Decorative navigation icons use `aria-hidden="true"`.
- There is one sign-out action, inside the candidate profile menu. LinkedIn is now a plain footer link; the floating shortcut has been removed.

### Dashboard
- Greeting: `Good evening, {name}`.
- Three stats: coding problems completed, aptitude average, and company questions attempted.
- Continue card links to the most recently visited route, falling back to Aptitude if no useful route is saved yet.
- Four learning cards use counts derived from the profile or question-bank data rather than hard-coded company/language totals.

### Authentication and registration
- Login uses a two-panel desktop layout and stacks the form before the brand panel on mobile.
- Password visibility can be toggled without changing the password field or login request.
- Registration fields and validation are unchanged; only their visual grouping and progress indicator are new.
- Error messages use alert semantics and are connected to the relevant fields with `aria-describedby` where the form displays an error.

## Beginner explanation

### CSS variables
The variables at the top of `client/src/index.css` are the design system. For example:
- `--paper` is the warm page background.
- `--surface` is the white card and form background.
- `--border` is the warm outline around cards and inputs.
- `--ink` and `--muted` are the main and secondary text colors.
- `--accent` is the deep teal used for links, active navigation and primary actions.
- `--warning` is terracotta, reserved for error states.
- `--font-display` selects Fraunces for headings; `--font-body` selects Inter for regular text.
- `--space-*`, `--radius-*` and `--shadow-hover` keep spacing, corner shapes and hover depth consistent.

Changing one token updates every component that uses it. This is easier to maintain than editing the same color in dozens of CSS rules.

### Layout changes
`App.jsx` now has a single shared header and footer around the same route table. CSS media queries change the navigation according to screen width. The pages still render their existing React content; the new CSS gives their existing class names the editorial card, type, spacing and button treatment.

### New React code
- The layout watches React Router's current path and saves it to `placepoint-last-path`. This lets the dashboard's Continue card reopen the previous section.
- The dashboard reads existing student-scoped localStorage records and calculates its three summary values. It does not change how those records are saved.
- The login page adds a small boolean state called `showPassword`; it switches the input between `password` and `text` and does not affect authentication.
- The registration page wraps the same fields in three semantic sections. It does not change the registration payload or validation.

## Commands to run locally
Run from the project root (the folder containing `client/`):

```bash
cd client && npm ci
npm run dev
npm run build
npm run lint
```

For `npm run build` and `npm run lint`, stop the dev server first if it is occupying the terminal (`Ctrl+C`). You can also open a second terminal in `client/`.

### Expected result
- `npm ci`: installs the exact dependency versions from `client/package-lock.json`.
- `npm run dev`: Vite prints a local URL, normally `http://localhost:5173/`.
- `npm run build`: Vite prints `✓ built in ...` and creates `client/dist/`.
- `npm run lint`: Oxlint exits without reporting new warnings or errors.

## Validation performed in this environment
- All client `.jsx` files were parsed using the installed TypeScript JSX parser with no syntax errors.
- Route declarations were checked against the requested route list.
- Existing service/API files, question banks, coding runner and localStorage-writing logic were not edited.
- The previous floating LinkedIn element and its CSS were removed; the footer now contains a text link.
- `npm ci` could not complete in this environment because the npm registry request timed out; offline installation also confirmed that the Vite tarball is not cached.
- Consequently, `npm run build` reports `vite: not found` and `npm run lint` reports `oxlint: not found` here. **A successful Vite build and lint run are not claimed.** Run the commands above on a machine with npm registry access to complete those checks.

## Known limitations / checks still needed
- No browser automation or visual browser was available here, so screenshots and overflow checks at 375px, 768px, 1024px and 1440px have not been independently run. The CSS breakpoints are authored for those ranges; please verify on-device.
- Contrast colors were selected to meet the requested high-contrast direction, but no automated WCAG contrast audit was available in this environment.
- Fraunces and Inter load from Google Fonts when online; fallback fonts are used offline.
- The redesign does not change existing known logic bugs or backend behaviour, as requested.
- The dashboard uses existing localStorage values. If a student has not yet practised, the stats correctly begin at zero.
