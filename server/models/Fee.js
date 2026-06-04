const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  semester: String,
  year: Number,
  amount: {
    type: Number,
    required: true
  },
  dueDate: Date,
  paymentDate: Date,
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'partial'],
    default: 'pending'
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  paymentMethod: String,
  transactionId: String,
  remarks: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

feeSchema.index({ student: 1, semester: 1, year: 1 });

module.exports = mongoose.model('Fee', feeSchema);
