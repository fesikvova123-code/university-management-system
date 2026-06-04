const express = require('express');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().populate('faculty');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create course
router.post('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('faculty');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update course
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'faculty']), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course enrollments
router.get('/:id/enrollments', authMiddleware, roleMiddleware(['admin', 'faculty']), async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.id }).populate('student');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
