# PlacePoint API

Express + MongoDB backend. Install with `npm install`, copy `.env.example` to `.env`, set a random `JWT_SECRET` of at least 32 characters, ensure MongoDB is running, then use `npm run dev`.

Protected routes use `Authorization: Bearer <token>`:
- `GET /api/progress`
- `PUT /api/progress`
- `GET /api/interviews`
- `POST /api/interviews`
- `GET /api/students/profile`

`POST /api/students/login` returns `{ token, student }`. Registration and login are rate-limited. See the root `FIXES-AND-TESTING.md` for payload rules and manual acceptance tests.


### Online presence counters

`POST /api/presence/heartbeat` requires a valid student JWT and updates `Student.lastSeenAt`. `POST /api/presence/logout` clears that marker when the student signs out. `GET /api/presence/stats` is public and reports unique student accounts seen within 30 minutes and 5 minutes. The frontend refreshes these values every 60 seconds. This is a recent-heartbeat estimate, not an authoritative count of open browser tabs or every unexpired token.
