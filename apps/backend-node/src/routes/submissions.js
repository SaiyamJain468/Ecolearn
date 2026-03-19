const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const EcoPointsEngine = require('../services/EcoPointsEngine');

// Get all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find().populate('student').sort({ submitted_at: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve submission (Award Points)
router.patch('/:id/approve', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'SUBMISSION_NOT_FOUND' });
    
    const result = await EcoPointsEngine.award(
        submission.student, 
        req.body.points || 200, 
        `Approved: ${submission.challenge_title}`,
        submission._id
    );
    
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reject submission
router.patch('/:id/reject', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, {
        status: 'rejected',
        rejection_reason: req.body.reason || 'NO_REASON_PROVIDED',
        reviewed_at: new Date()
    }, { new: true });
    
    res.json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
