const express = require('express');
const Progress = require('../models/Progress');
const requireAuth = require('../middleware/auth');
const router = express.Router();
const allowedFields = ['aptitudeResults', 'aptitudeLatest', 'codingCompleted', 'companyProgress'];
function validateProgress(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  if (Object.keys(body).some(key => !allowedFields.includes(key))) return false;
  if ('aptitudeResults' in body && (!body.aptitudeResults || typeof body.aptitudeResults !== 'object' || Array.isArray(body.aptitudeResults) || Object.keys(body.aptitudeResults).length > 200 || Object.entries(body.aptitudeResults).some(([key, value]) => key.length > 120 || !value || typeof value !== 'object' || Array.isArray(value) || (value.level !== undefined && (typeof value.level !== 'string' || value.level.length > 40)) || (value.topic !== undefined && (typeof value.topic !== 'string' || value.topic.length > 80)) || ['score','total','percent'].some(field => value[field] !== undefined && (typeof value[field] !== 'number' || !Number.isFinite(value[field])))))) return false;
  if ('aptitudeLatest' in body && body.aptitudeLatest !== null && (typeof body.aptitudeLatest !== 'object' || Array.isArray(body.aptitudeLatest) || Object.keys(body.aptitudeLatest).length > 30 || (body.aptitudeLatest.level !== undefined && (typeof body.aptitudeLatest.level !== 'string' || body.aptitudeLatest.level.length > 40)) || (body.aptitudeLatest.topic !== undefined && (typeof body.aptitudeLatest.topic !== 'string' || body.aptitudeLatest.topic.length > 80)) || ['score','total','percent'].some(field => body.aptitudeLatest[field] !== undefined && (typeof body.aptitudeLatest[field] !== 'number' || !Number.isFinite(body.aptitudeLatest[field]))))) return false;
  if ('codingCompleted' in body && (!body.codingCompleted || typeof body.codingCompleted !== 'object' || Array.isArray(body.codingCompleted) || Object.keys(body.codingCompleted).length > 500 || Object.entries(body.codingCompleted).some(([key, value]) => key.length > 240 || typeof value !== 'boolean'))) return false;
  if ('companyProgress' in body && (!body.companyProgress || typeof body.companyProgress !== 'object' || Array.isArray(body.companyProgress) || Object.keys(body.companyProgress).length > 500 || Object.entries(body.companyProgress).some(([key, value]) => key.length > 180 || !value || typeof value !== 'object' || Array.isArray(value) || typeof value.answered !== 'boolean' || !(value.correct === null || typeof value.correct === 'boolean') || typeof value.updatedAt !== 'string' || value.updatedAt.length > 40))) return false;
  return JSON.stringify(body).length <= 200000;
}
router.get('/', requireAuth, async (req, res) => {
  try { return res.json({ progress: await Progress.findOne({ email: req.student.email }) }); }
  catch (error) { console.error('Progress fetch failed:', error); return res.status(500).json({ message: 'Could not fetch progress.' }); }
});
router.get('/:email', requireAuth, async (req, res) => {
  if (req.params.email.toLowerCase() !== req.student.email) return res.status(403).json({ message: 'Access denied.' });
  try { return res.json({ progress: await Progress.findOne({ email: req.student.email }) }); }
  catch (error) { console.error('Progress fetch failed:', error); return res.status(500).json({ message: 'Could not fetch progress.' }); }
});
router.put('/', requireAuth, async (req, res) => {
  if (!validateProgress(req.body)) return res.status(400).json({ message: 'Invalid progress data.' });
  try {
    const update = { email: req.student.email, updatedAt: new Date() };
    for (const field of allowedFields) if (Object.prototype.hasOwnProperty.call(req.body, field)) update[field] = req.body[field];
    const progress = await Progress.findOneAndUpdate({ email: req.student.email }, { $set: update }, { new: true, upsert: true, runValidators: true });
    return res.json({ message: 'Progress saved.', progress });
  } catch (error) { console.error('Progress save failed:', error); return res.status(500).json({ message: 'Could not save progress.' }); }
});
module.exports = router;
