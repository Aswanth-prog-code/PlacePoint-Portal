const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');
const router = express.Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many attempts. Please try again later.' } });

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (error, key) => error ? reject(error) : resolve(`${salt}:${key.toString('hex')}`));
  });
}
function verifyPassword(password, stored) {
  return new Promise((resolve, reject) => {
    const [salt, keyHex] = (stored || '').split(':');
    if (!salt || !keyHex) return resolve(false);
    crypto.scrypt(password, salt, 64, (error, derived) => {
      if (error) return reject(error);
      const original = Buffer.from(keyHex, 'hex');
      resolve(original.length === derived.length && crypto.timingSafeEqual(original, derived));
    });
  });
}
function publicStudent(student) {
  return { name: student.name, email: student.email, college: student.college, year: student.year, languages: student.languages, companies: student.companies, createdAt: student.createdAt };
}
function validString(value, max) { return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max; }
function validStringArray(value, maxItems, maxLength) { return Array.isArray(value) && value.length > 0 && value.length <= maxItems && value.every(item => validString(item, maxLength)); }

router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, college, year, languages, companies } = req.body || {};
    if (!validString(name, 100) || !validString(email, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !validString(password, 200) || !validString(college, 160) || !validString(year, 40) || !validStringArray(languages, 20, 40) || !validStringArray(companies, 30, 80)) return res.status(400).json({ message: 'Please provide valid details in every required field.' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must contain at least 8 characters.' });
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Student.findOne({ email: normalizedEmail }).select('+passwordHash');
    if (existing) return res.status(409).json({ message: 'An account with this email already exists. Please sign in.' });
    const student = await Student.create({ name: name.trim(), email: normalizedEmail, passwordHash: await hashPassword(password), college: college.trim(), year: year.trim(), languages: languages.map(x => x.trim()), companies: companies.map(x => x.trim()) });
    return res.status(201).json({ message: 'Account created successfully. Please sign in.', student: publicStudent(student) });
  } catch (error) { console.error('Student registration failed:', error); return res.status(500).json({ message: 'Could not create account.' }); }
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.toLowerCase().trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!validString(email, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !validString(password, 200)) return res.status(400).json({ message: 'Enter a valid email and password.' });
    const student = await Student.findOne({ email }).select('+passwordHash');
    if (!student || !(await verifyPassword(password, student.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' });
    const token = jwt.sign({ email: student.email }, process.env.JWT_SECRET, { subject: student._id.toString(), expiresIn: '7d' });
    return res.json({ message: 'Login successful.', token, student: publicStudent(student) });
  } catch (error) { console.error('Student login failed:', error); return res.status(500).json({ message: 'Could not sign in.' }); }
});

router.get('/profile', requireAuth, async (req, res) => {
  try { const student = await Student.findById(req.student.id); if (!student) return res.status(404).json({ message: 'Profile not found.' }); return res.json({ student: publicStudent(student) }); }
  catch (error) { console.error('Profile fetch failed:', error); return res.status(500).json({ message: 'Could not fetch profile.' }); }
});
router.get('/profile/:email', requireAuth, async (req, res) => {
  if (req.params.email.toLowerCase() !== req.student.email) return res.status(403).json({ message: 'Access denied.' });
  try { const student = await Student.findById(req.student.id); if (!student) return res.status(404).json({ message: 'Profile not found.' }); return res.json({ student: publicStudent(student) }); }
  catch (error) { console.error('Profile fetch failed:', error); return res.status(500).json({ message: 'Could not fetch profile.' }); }
});
module.exports = router;
