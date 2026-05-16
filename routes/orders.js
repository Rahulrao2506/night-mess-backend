const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const tokenNumber = Math.floor(Math.random() * 900) + 100;
    const estimatedTime = items.reduce((acc, item) => acc + (item.prepTime || 10), 0);
    const order = await Order.create({
      student: req.user.id, items, totalAmount,
      tokenNumber, estimatedTime, paymentStatus: 'paid'
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const orders = await Order.find().populate('student', 'name email rollNumber').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;