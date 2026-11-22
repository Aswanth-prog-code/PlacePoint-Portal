# PlacePoint Frontend — Version 4

This is the React + Vite frontend designed to work with the PlacePoint Express + MongoDB backend in `PlacePoint-FullStack-Backend-v4.zip`.

## Features
- First-time student profile setup (name, email, college, year, known languages, target companies)
- Aptitude practice with level/topic selection and server-synced results
- Programming practice across multiple languages and levels, with completion tracking
- Interview setup based on selected languages, mock interview sessions, and printable revision papers
- Progress dashboard with aptitude, coding, language, and company-readiness estimates

## Run
1. Extract this folder.
2. Open a terminal inside this folder (`client`).
3. Run `npm install`.
4. Copy `.env.example` to `.env` (or create `.env`) and set:

   `VITE_API_URL=http://localhost:5000/api`

5. Make sure the backend and MongoDB are running.
6. Run `npm run dev`.

Vite normally starts at `http://localhost:5173`. The backend's `CLIENT_URL` should allow that origin.

## Backend API connections
- `POST /api/students/profile`
- `GET /api/students/profile/:email`
- `GET /api/progress/:email`
- `PUT /api/progress/:email`
- `POST /api/interviews`
- `GET /api/interviews/:email`

## Important limitations
- This frontend matches the API routes in PlacePoint Backend Version 4.
- The current backend does not implement JWT authentication or password-based accounts. The profile email is used as the lookup key; this is suitable for a local project demonstration only, not public deployment with real student data.
- Interview responses are saved, but there is no AI-based answer evaluation or automated coding execution.
- Company readiness is an indicative activity-based estimate, not a verified company-specific hiring score.
