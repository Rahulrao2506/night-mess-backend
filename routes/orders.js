const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();

// Place order — student must be logged in
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

// My orders — student must be logged in
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// All orders — NO auth required (admin uses sessionStorage not JWT)
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('student', 'name email rollNumber')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update order status — NO auth required (admin uses sessionStorage not JWT)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;