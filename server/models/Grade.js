const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  midterm: Number,
  final: Number,
  assignment: Number,
  participation: Number,
  totalMarks: Number,
  grade: String,
  gradePoints: Number,
  semester: String,
  year: Number,
  remarks: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

gradeSchema.index({ student: 1, course: 1, semester: 1 });

module.exports = mongoose.model('Grade', gradeSchema);
