const express = require('express');
const InterviewSession = require('../models/InterviewSession');
const requireAuth = require('../middleware/auth');
const router = express.Router();
router.post('/', requireAuth, async (req, res) => {
  try {
    const { category, languages, questions, answers } = req.body || {};
    if (typeof category !== 'string' || !category.trim() || category.length > 100 || !Array.isArray(languages) || languages.length > 20 || languages.some(x => typeof x !== 'string' || !x.trim() || x.length > 40) || !Array.isArray(questions) || !questions.length || questions.length > 30 || questions.some(q => !(typeof q === 'string' && q.trim().length > 0 && q.length <= 2000) && !(q && typeof q === 'object' && !Array.isArray(q) && JSON.stringify(q).length <= 5000)) || typeof answers !== 'object' || answers === null || Array.isArray(answers) || Object.keys(answers).length > 30 || Object.entries(answers).some(([key, value]) => key.length > 100 || typeof value !== 'string' || value.length > 10000)) return res.status(400).json({ message: 'Invalid interview session data.' });
    const answeredCount = Object.values(answers).filter(value => typeof value === 'string' && value.trim()).length;
    const session = await InterviewSession.create({ email: req.student.email, category, languages, questions, answers, answeredCount });
    return res.status(201).json({ message: 'Interview session saved.', session });
  } catch (error) { console.error('Interview save failed:', error); return res.status(500).json({ message: 'Could not save interview session.' }); }
});
router.get('/', requireAuth, async (req, res) => {
  try { return res.json({ sessions: await InterviewSession.find({ email: req.student.email }).sort({ completedAt: -1 }).limit(20) }); }
  catch (error) { console.error('Interview fetch failed:', error); return res.status(500).json({ message: 'Could not fetch interview sessions.' }); }
});
router.get('/:email', requireAuth, async (req, res) => {
  if (req.params.email.toLowerCase() !== req.student.email) return res.status(403).json({ message: 'Access denied.' });
  try { return res.json({ sessions: await InterviewSession.find({ email: req.student.email }).sort({ completedAt: -1 }).limit(20) }); }
  catch (error) { console.error('Interview fetch failed:', error); return res.status(500).json({ message: 'Could not fetch interview sessions.' }); }
});
module.exports = router;
