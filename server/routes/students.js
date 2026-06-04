const express = require('express');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const Grade = require('../models/Grade');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all students
router.get('/', authMiddleware, roleMiddleware(['admin', 'faculty']), async (req, res) => {
  try {
    const students = await Student.find().populate('userId');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'student']), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student enrollments
router.get('/:id/enrollments', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.id }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student grades
router.get('/:id/grades', authMiddleware, async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.id }).populate('course');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
