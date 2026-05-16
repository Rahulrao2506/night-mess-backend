const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'preparing', 'ready', 'completed', 'rejected'],
    default: 'pending'
  },
  paymentId: String,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  qrCode: String,
  estimatedTime: Number,
  tokenNumber: Number
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);