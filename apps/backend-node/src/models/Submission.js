const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  challenge_title: { type: String, required: true },
  category: { type: String, enum: ['plant', 'waste', 'water', 'energy', 'awareness'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  proof_image_url: { type: String },
  submitted_at: { type: Date, default: Date.now },
  points_awarded: { type: Number, default: 0 },
  reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, 
  reviewed_at: { type: Date },
  rejection_reason: { type: String }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
