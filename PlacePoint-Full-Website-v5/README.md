# PlacePoint – Placement Preparation Portal

## Run locally (Windows)

### 1. Start MongoDB
Install and start MongoDB Community Server, or use a MongoDB Atlas connection string. The default local database is `mongodb://127.0.0.1:27017/placepoint`.

### 2. Configure the backend
Open a terminal in the project root and run:

```powershell
cd server
copy .env.example .env
```

Edit `server/.env`. Set a private JWT secret (at least 32 characters), for example generate one with PowerShell:

```powershell
-join ((1..48) | ForEach-Object { [char](Get-Random -Minimum 33 -Maximum 127) })
```

Keep `MONGO_URI` as the local URI above if using local MongoDB. For Atlas, replace it with your Atlas connection string. Set `CLIENT_URL=http://localhost:5173,http://localhost:5174`. Never commit `.env`.

Then install and start the backend:

```powershell
npm install
npm run dev
```

Expected terminal messages: `MongoDB connected successfully` and `PlacePoint API running at http://localhost:5000`.

### 3. Start the frontend (second terminal)
From the project root:

```powershell
cd client
npm install
npm run dev
```

Open the exact localhost URL Vite prints (usually `http://localhost:5173`, or `5174` if 5173 is busy).

### 4. Check backend health
Open `http://localhost:5000/api/health`. A healthy response reports `status: ok` and `database: connected`. If this URL does not open, the backend is not listening. If it reports unavailable, check the MongoDB service and `MONGO_URI`.

## Common errors
- **JWT_SECRET:** local development uses a fixed development-only fallback if no valid secret is configured. Before production deployment, set a private `JWT_SECRET` of at least 32 characters in the hosting environment.
- **MongoDB connection failed:** start MongoDB Community Server or correct `MONGO_URI` for Atlas.
- **Failed to fetch:** confirm the backend is running on port 5000, check `/api/health`, then reload the frontend. Localhost development origins on Vite ports are allowed by the backend.
- **Port already in use:** close the process using the port or use the port Vite prints; the API is configured for port 5000.

Do not share `.env` contents or publish secrets.

## Login / 404 troubleshooting

The frontend sends login requests to `POST /api/students/login`. The backend must be the latest PlacePoint API and must register `server/routes/studentRoutes.js` with `app.use('/api/students', studentRoutes)` in `server/server.js`. This project version includes that route registration. It also supports the compatibility path `POST /api/auth/login`.

For local development, `client/.env.example` uses `http://localhost:5000/api`. Copy it to `client/.env` only if you need to change the API address. The client accepts either `VITE_API_URL=https://your-api-host.example` or `VITE_API_URL=https://your-api-host.example/api`.

**If the frontend is deployed as a static site (for example, Vercel or GitHub Pages), the backend must also be deployed to a public Node.js hosting service.** In the frontend hosting project's Environment Variables, set `VITE_API_URL` to the public backend origin or its `/api` base, then redeploy the frontend. Do not use `localhost` for a publicly deployed frontend: visitors' browsers would try to contact their own computers. Set the backend `CLIENT_URL` to the exact deployed frontend origin and configure its `MONGO_URI` and private `JWT_SECRET` in the backend host's environment settings.

After deploying the backend, verify `https://your-api-host.example/api/health` reports `status: ok` and `database: connected`. The login endpoint is `POST https://your-api-host.example/api/students/login` (not a page to open directly in a browser).


## Latest additions

- Company-wise preparation now includes Amazon, Google, Zoho, Capgemini, TCS, Cognizant and Accenture. Company type and focus are shown on the company cards. New practice banks are original learning prompts aligned to common fresher interview themes; they are not claimed to be verified past interview questions.
- The Books section contains four original downloadable PDF guides in `client/public/books/`.
- The footer shows unique student accounts with a successful heartbeat in the last 30 minutes and the subset seen in the last 5 minutes. These are approximate online-presence counts, not a count of every currently valid JWT session.
- Student presence uses the `lastSeenAt` field in the existing Student collection; no extra database collection is required.

## Online presence counters

The authenticated frontend sends a heartbeat every 60 seconds to `POST /api/presence/heartbeat`; signing out clears the presence marker through `POST /api/presence/logout`. `GET /api/presence/stats` reports unique student accounts seen in the previous 30 minutes (`loggedInUsers`) and 5 minutes (`activeUsers`). Counts remain `—` in the footer if the API is unavailable.

## Books

The four PDFs under `client/public/books/` are original PlacePoint study materials. They are served as static assets and the Download PDF links save them to the visitor's computer. Do not replace them with copyrighted paid books or Scribd downloads unless you have distribution rights.
