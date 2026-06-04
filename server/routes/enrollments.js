const express = require('express');
const Enrollment = require('../models/Enrollment');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Create enrollment
router.post('/', authMiddleware, roleMiddleware(['admin', 'student']), async (req, res) => {
  try {
    const { student, course } = req.body;
    
    const existingEnrollment = await Enrollment.findOne({ student, course });
    if (existingEnrollment) {
      return res.status(400).json({ error: 'Student already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      student,
      course,
      enrollmentDate: new Date(),
      status: 'active'
    });
    
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all enrollments
router.get('/', authMiddleware, roleMiddleware(['admin', 'faculty']), async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('student').populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get enrollment by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course');
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enrollment
router.put('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete enrollment
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enrollment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
