const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  aptitudeResults: { type: mongoose.Schema.Types.Mixed, default: {} },
  aptitudeLatest: { type: mongoose.Schema.Types.Mixed, default: null },
  codingCompleted: { type: mongoose.Schema.Types.Mixed, default: {} },
  companyProgress: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
