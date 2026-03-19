const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Register a new student
router.post('/register', async (req, res) => {
  try {
    const { first_name, email, password, school_id } = req.body;
    
    // Check if student exists
    let student = await Student.findOne({ email });
    if (student) return res.status(400).json({ message: 'STUDENT_ALREADY_EXISTS' });

    student = new Student({
      first_name,
      email,
      password, // Note: In production, hash this with bcrypt
      school_id,
      eco_points_total: 0,
      level: 1,
      rank: 0
    });

    await student.save();

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'GAIA_SECRET_KEY', { expiresIn: '1d' });
    res.status(201).json({ token, user: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    
    if (!student || student.password !== password) {
      return res.status(401).json({ message: 'INVALID_CREDENTIALS' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'GAIA_SECRET_KEY', { expiresIn: '1d' });
    res.json({ token, user: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current student profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'UNAUTHORIZED' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'GAIA_SECRET_KEY');
    const student = await Student.findById(decoded.id).select('-password');
    
    if (!student) return res.status(404).json({ message: 'STUDENT_NOT_FOUND' });
    res.json(student);
  } catch (err) {
    res.status(401).json({ message: 'INVALID_TOKEN' });
  }
});

// Get all students (Leaderboard)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ eco_points_total: -1 }).limit(10);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
