const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  college: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  languages: [{ type: String, trim: true }],
  companies: [{ type: String, trim: true }],
  lastSeenAt: { type: Date, default: null, index: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
