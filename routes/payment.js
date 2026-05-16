const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-order', auth, async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });
    const order = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(sign).digest('hex');
    if (expected !== razorpay_signature) return res.status(400).json({ success: false, message: 'Invalid payment' });
    res.json({ success: true, message: 'Payment verified' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;