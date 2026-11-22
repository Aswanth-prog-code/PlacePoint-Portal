const express = require('express');
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');
const router = express.Router();

// One heartbeat per signed-in account keeps the public footer counters unique
// even when a student has multiple tabs open.
router.post('/heartbeat', requireAuth, async (req, res) => {
  try {
    await Student.updateOne(
      { _id: req.student.id },
      { $set: { lastSeenAt: new Date() } }
    );
    return res.json({ success: true });
  } catch (error) {
    console.error('Presence heartbeat failed:', error.message);
    return res.status(500).json({ message: 'Could not update online presence.' });
  }
});


router.post('/logout', requireAuth, async (req, res) => {
  try {
    await Student.updateOne(
      { _id: req.student.id },
      { $set: { lastSeenAt: null } }
    );
    return res.json({ success: true });
  } catch (error) {
    console.error('Presence logout update failed:', error.message);
    return res.status(500).json({ message: 'Could not update sign-out status.' });
  }
});

// “Signed in recently” means a successful authenticated heartbeat in the last
// 30 minutes; “Active now” means a heartbeat in the last 5 minutes.
router.get('/stats', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  try {
    const now = Date.now();
    const loggedInSince = new Date(now - 30 * 60 * 1000);
    const activeSince = new Date(now - 5 * 60 * 1000);
    const [loggedInUsers, activeUsers] = await Promise.all([
      Student.countDocuments({ lastSeenAt: { $gte: loggedInSince } }),
      Student.countDocuments({ lastSeenAt: { $gte: activeSince } })
    ]);
    return res.json({ loggedInUsers, activeUsers, updatedAt: new Date(now).toISOString() });
  } catch (error) {
    console.error('Presence stats failed:', error.message);
    return res.status(500).json({ message: 'Could not load online statistics.' });
  }
});

module.exports = router;
