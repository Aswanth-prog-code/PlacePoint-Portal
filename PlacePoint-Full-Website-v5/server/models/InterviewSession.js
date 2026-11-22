const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  category: { type: String, default: 'Mixed interview' },
  languages: [{ type: String }],
  questions: [{ type: mongoose.Schema.Types.Mixed }],
  answers: { type: mongoose.Schema.Types.Mixed, default: {} },
  answeredCount: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
