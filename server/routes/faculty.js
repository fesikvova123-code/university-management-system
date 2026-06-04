const express = require('express');
const Faculty = require('../models/Faculty');
const Course = require('../models/Course');
const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all faculty
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const faculty = await Faculty.find().populate('userId').populate('courses');
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get faculty by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate('userId').populate('courses');
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update faculty
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'faculty']), async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get faculty courses
router.get('/:id/courses', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ faculty: req.params.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark attendance
router.post('/:id/attendance', authMiddleware, roleMiddleware(['faculty']), async (req, res) => {
  try {
    const { student, course, date, status } = req.body;
    const attendance = new Attendance({
      student,
      course,
      date,
      status,
      markedBy: req.params.id
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit grades
router.post('/:id/grades', authMiddleware, roleMiddleware(['faculty']), async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
