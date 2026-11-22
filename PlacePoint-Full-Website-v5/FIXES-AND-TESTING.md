# PlacePoint fixes and testing guide

## Scope and assumptions

- The existing React 19 + Vite client and Express + MongoDB server are retained.
- No unrelated page redesign or framework migration was performed.
- The coding editor accepts `function solution(input) { ... }`. `input` is the complete raw input string shown in the problem statement.
- Only JavaScript runs automatically in the browser. C, C++, Java, Python and the other listed languages are editable but must be copied to a local compiler.
- LRU Cache, Kth Largest Element and Course Schedule are explicitly marked **manual check**. The other 26 problems have three test cases each.
- The coding bank has 29 problems: 9 Beginner, 10 Intermediate and 10 Advanced. Progress uses the computed total from the coding bank, not a fixed number.
- Amazon, Google and Zoho each contain 100 prompts (25 Behavioural, 25 Technical, 25 Coding and 25 HR). Capgemini, TCS, Cognizant and Accenture each contain 48 prompts (12 per category). New banks are original practice material aligned to common fresher hiring themes, not verified past-question archives. MCQs have explanations.
- Production JWT login requires a private `JWT_SECRET` of at least 32 characters. Local development uses a fixed development-only fallback if none is configured.

## A. Coding runner

**Goal:** prevent an infinite loop from freezing the page, compare equivalent array output formats, give each problem an input/output contract, run multiple tests, and preserve code when changing problems.

**Files:**
- `client/src/pages/Coding.jsx`
- `client/src/pages/Progress.jsx`

**What changed:**
- Replaced the hidden iframe runner and escaped script close tag with a Web Worker created from a Blob. The worker is terminated after 2 seconds; the result shown is `Time limit exceeded.`
- The worker runs each supported problem against three test inputs. It returns `Correct! All test cases passed.` or `Wrong answer` with per-test results.
- Output comparison ignores array brackets/commas and whitespace, so `[0,1]`, `[1, 2]` and `0 1` compare consistently for the array-style outputs used here.
- Every problem now displays its input format and canonical output guidance. `solution(input)` receives the full input as a string.
- LRU Cache, Kth Largest Element and Course Schedule are labelled manual check; they are not falsely reported as automatically graded.
- Beginner remains at nine problems; Intermediate and Advanced have ten each. The disclaimer and progress denominator reflect 29 total problems.
- Code is saved by `language::level::title` in the student's email-namespaced local storage key, so switching questions does not erase the previous solution.

**Beginner explanation:** the page sends your code and test data to a separate Web Worker. The main page stays responsive while the worker runs. If the worker does not finish in two seconds, the page stops it. A function named `solution` receives one string containing the sample input; your code must parse that string and return the answer.

**Limitations:** this browser worker is a practice runner, not a secure online judge. It does not provide C/C++/Java/Python execution. The timeout limits a runaway worker but is not a complete sandbox against malicious code. Manual-check problems require a human review.

## B. Progress calculation

**Goal:** compute coding progress from the actual question bank and clamp each language's percentage to 100.

**Files:**
- `client/src/pages/Coding.jsx` exports `CODING_PROBLEM_COUNT` from the three level arrays.
- `client/src/pages/Progress.jsx` imports that value and uses it for the per-language target and percentage.

**Beginner explanation:** if a language has 29 questions, completing 29 gives `29 / 29 = 100%`. Completing 12 gives about 41%, not 100%. The value is calculated from the question data, so it changes automatically if the bank changes.

## C. Aptitude content

**Goal:** remove ambiguous answer choices.

**File:** `client/src/pages/Aptitude.jsx`

- Beginner Verbal now asks for the correct sentence **in the simple present tense**. The past-tense option remains grammatically valid but no longer answers the stated question.
- The seating-order prompt now says four people, matching A, B, C and D.

## D. Company question bank

**Files:**
- `client/src/pages/companyQuestionBank.js`
- `client/src/pages/Companies.jsx`

**Goal:** make the three company banks consistent and useful.

- Amazon: 100 questions; Google: 100; Zoho: 100; Capgemini, TCS, Cognizant and Accenture: 48 each.
- Each has 25 questions in each of Behavioural, Technical, Coding and HR.
- Zoho has its own business-software, CRM, audit-trail, multi-tenant and SaaS-oriented MCQs in Technical and Coding.
- Missing MCQ explanations are populated from the model answer/rationale.
- Exact repeated cross-company prompts are flagged `sharedCore` and the practice page visibly labels them `Shared core question`.
- Company progress is stored per student and synced through the authenticated progress API.

**Important content note:** all company banks are practice prompts. The new company cards show company type and preparation focus. The material is not a claim that the companies officially asked these exact questions or use the same process for every role, campus or year.

## E. Client cleanup and per-student data

**Files:**
- `client/src/pages/Companies.jsx`
- `client/src/App.jsx`
- `client/src/pages/Dashboard.jsx` (renamed from `Login.jsx`)
- `client/src/pages/AuthLogin.jsx`
- `client/src/pages/ProfileSetup.jsx`
- `client/src/pages/Aptitude.jsx`
- `client/src/pages/Coding.jsx`
- `client/src/pages/Interview.jsx`
- `client/src/pages/Progress.jsx`
- `client/src/services/api.js`

**Goal:** keep students' browser data separate and keep routes in sync with the selected company/module.

- Removed the unused `useMemo` import from Companies and renamed the unused reduce parameter to `_id`.
- Reset the company question index and answer state when company/category route parameters change.
- Renamed `Login.jsx` to `Dashboard.jsx` and updated the App import.
- The sign-in response stores the JWT token; API requests attach it as a Bearer token.
- Progress keys use a suffix such as `placepoint-coding-completed:student@example.com`.
- Logout clears all `placepoint-` keys and the active account state.
- Failed progress saves are kept in a per-student pending key. The Progress page retries the pending save on its next visit.
- Server data only replaces local progress when the server returned a real, non-empty record; an empty default does not erase local work.
- Profile registration displays server validation messages as-is. The backend/MongoDB hint is added only for a network/fetch failure.

**Beginner explanation:** the email suffix acts like a separate drawer for each student in the same browser. The JWT proves which account is signed in; the server uses the email inside that verified token rather than trusting an email supplied in a URL or request body.

## F. Server security

**Files:**
- `server/server.js`
- `server/routes/studentRoutes.js`
- `server/routes/progressRoutes.js`
- `server/routes/interviewRoutes.js`
- `server/middleware/auth.js` (new)
- `server/models/Progress.js`
- `server/package.json`
- `server/.env.example`
- `server/.gitignore` (new)
- `.gitignore` (new)

**Goal:** authenticate student data requests, slow repeated login/register attempts, validate payloads, and avoid leaking internal errors.

- Login returns a signed JWT valid for seven days. Protected endpoints are `GET /api/progress`, `PUT /api/progress`, `GET/POST /api/interviews` and `GET /api/students/profile`.
- Legacy email-in-path routes remain protected for compatibility. They compare the URL email to the verified token; they do not use the URL as identity. Missing/invalid tokens return 401.
- Login and registration share a rate limit of 10 attempts per 15 minutes per IP.
- New passwords must be at least eight characters. Registration validates strings, email shape, arrays, item lengths and required fields. Interview and progress payloads are type-checked, length-limited and progress fields are whitelisted.
- Internal exceptions are logged on the server; clients receive generic error messages.
- `/api/health` reports the actual Mongoose connection state.
- The shared project does not contain `server/.env`. Only `server/.env.example` is included.

**Beginner explanation:** JWT is a signed pass. After login, the browser sends it with each protected request. The server verifies the signature and gets the student identity from the token. Rate limiting reduces password-guessing attempts. A whitelist means the client can update only the progress fields the API expects, not arbitrary database fields.

## Install and run

Use two terminals from the project root (`PlacePoint-Full-Website-v5/`). Node.js 20.19+ or 22.12+ is recommended for Vite 8.

### 1. Configure the server

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env`, then set a private JWT secret. Example on macOS/Linux:

```bash
cp .env.example .env
openssl rand -hex 32
```

Paste the generated value after `JWT_SECRET=` in `.env`. On Windows, copy `.env.example` to `.env` manually and use a password generator to create a random secret of at least 32 characters.

Start MongoDB locally, then run:

```bash
npm run dev
```

Expected server output includes `MongoDB connected successfully` and `PlacePoint API running at http://localhost:5000`.

### 2. Install and run the Vite client

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). `client/.env.example` contains the default API URL; create `client/.env` only if your API runs elsewhere.

### 3. Required Vite build and lint checks

From `client/`:

```bash
npm run build
npm run lint
```

Expected build output ends with a successful `vite ... built in ...` message and a `dist/` directory. Expected lint output contains no warnings or errors.

### 4. Manual acceptance checks

1. Register two different student accounts with passwords of at least eight characters.
2. Sign in as student A, complete aptitude/coding/company practice, and sign out.
3. Sign in as student B in the same browser. B must see only B's progress. Sign out and sign in as A again; A's server-synced progress should return.
4. In DevTools, call `GET http://localhost:5000/api/progress/<another-email>` without an Authorization header. Expected: HTTP `401`.
5. Sign in, then call that same URL with a token belonging to a different email. Expected: HTTP `403`.
6. In the Coding page, run a correct JavaScript Two Sum solution. Expected: all tests pass and the result says `Correct!`.
7. Run `function solution(input) { while (true) {} }`. Expected: `Time limit exceeded.` within approximately two seconds and the page remains responsive.
8. Mark all 29 problems complete for one language. Expected language progress: `100%`. Mark only 12. Expected: approximately `41%`.
9. Open each company and verify 25 questions in each category (100 total); MCQs should show an explanation after submission.

## Verification status for this delivery

- Server JavaScript files were syntax-checked with `node --check`, and all frontend JS/JSX files passed a TypeScript parser syntax check.
- All four PDFs were generated and inspected; each is a valid four-page PDF.
- Company-bank data was loaded and counted: Amazon 100, Google 100, Zoho 100; Capgemini, TCS, Cognizant (CTS) and Accenture 48 each. All MCQs have valid option indexes and non-empty answer/explanation fields.
- The Vite build and Oxlint could **not be executed in this environment** because npm registry access failed with DNS `EAI_AGAIN` while downloading dependencies. Therefore this delivery does not claim `npm run build` or `npm run lint` passed here. Run the commands above after `npm install` on your computer; if either reports an issue, share the complete terminal output for a targeted fix.


## G. Books library and online presence

**Files:**
- `client/src/pages/Books.jsx`
- `client/src/App.jsx`
- `client/src/App.css`
- `client/public/books/*.pdf`
- `server/routes/presenceRoutes.js`
- `server/models/Student.js`

- Added a Books navigation item and searchable/filterable library with four original downloadable PDFs: aptitude, core CS, coding patterns, and interview/HR preparation. The PDFs are original PlacePoint notes and are not Scribd or paid-book copies.
- The main Progress report now includes per-company practice completion in addition to aptitude and coding summaries.
- Added an authenticated heartbeat every 60 seconds. `Student.lastSeenAt` stores the latest heartbeat. The footer counts unique student accounts seen within 30 minutes as “Logged in (30m)” and within 5 minutes as “Active (5m)”. These are approximate recent-presence metrics, not a count of open browser tabs or every unexpired JWT.
- Local development falls back to a fixed development-only JWT secret if no valid secret is configured. Production still requires a private secret in the environment.

**Manual acceptance checks to add:**
1. Open Books, filter each category, preview a PDF and download all four PDFs to the local computer.
2. Open Companies and verify the seven companies, product/service filters, company-type labels, and question counts: 100 for Amazon/Google/Zoho and 48 for Capgemini/TCS/Cognizant/Accenture.
3. Attempt at least one question in each category for a new company and confirm its progress appears in Company Progress and the main Progress report.
4. Sign in with two accounts in separate browsers. Confirm the footer counts unique student accounts rather than tabs. Confirm “Active (5m)” drops after the heartbeat stops for five minutes and “Logged in (30m)” drops after 30 minutes.
5. Confirm the footer shows `—` rather than a misleading zero if the API is unreachable.
