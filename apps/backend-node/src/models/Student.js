const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  first_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  class_grade: { type: String },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  eco_points_total: { type: Number, default: 0 },
  streak_days: { type: Number, default: 0 },
  last_active_date: { type: Date },
  avatar_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
