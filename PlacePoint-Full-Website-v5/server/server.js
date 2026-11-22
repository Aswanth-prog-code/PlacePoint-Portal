const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const presenceRoutes = require('./routes/presenceRoutes');

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

function isLocalDevOrigin(origin) {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    return ['localhost', '127.0.0.1'].includes(url.hostname) &&
      ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

app.use(cors({
  origin(origin, callback) {
    if (allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked origin: ${origin}`));
  }
}));
app.use(express.json({ limit: '1mb' }));

// Health endpoint: confirms that the API process and MongoDB are available.
app.get('/api/health', (req, res) => {
  const state = mongoose.connection.readyState;
  const labels = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.status(state === 1 ? 200 : 503).json({
    status: state === 1 ? 'ok' : 'unavailable',
    service: 'PlacePoint API',
    database: labels[state] || 'unknown'
  });
});

// Keep the complete feature routes registered. Login and registration live in
// studentRoutes; removing this mount causes the frontend login request to 404.
app.use('/api/students', studentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/presence', presenceRoutes);

// Friendly compatibility aliases for clients configured with /api/auth/... .
app.use('/api/auth', studentRoutes);

app.use((error, req, res, next) => {
  console.error('Unhandled API error:', error);
  if (res.headersSent) return next(error);
  return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

app.use((req, res) => {
  console.warn(`API route not found: ${req.method} ${req.originalUrl}`);
  return res.status(404).json({
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET.startsWith('replace-with-a-random')) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Set a private JWT_SECRET of at least 32 characters in your production environment.');
      process.exit(1);
      return;
    }
    process.env.JWT_SECRET = 'PlacePoint_Local_Development_Only_Secret_2026_Change_For_Production';
    console.warn('No valid JWT_SECRET found. Using the local-development fallback. Set a private JWT_SECRET before production deployment.');
  }

  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`PlacePoint API running at http://localhost:${PORT}`);
      console.log('Login endpoint: POST /api/students/login');
      console.log('Registration endpoint: POST /api/students/register');
    });
  } catch (error) {
    console.error('PlacePoint backend could not start because MongoDB is unavailable.');
    process.exit(1);
  }
}

startServer();
