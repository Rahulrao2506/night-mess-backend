const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/seed', async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    const items = [
      { name: 'Chicken Biryani', price: 120, category: 'Main Course', rating: 4.8, prepTime: 15, isHot: true, isAvailable: true },
      { name: 'Paneer Butter Masala', price: 90, category: 'Main Course', rating: 4.6, prepTime: 12, isHot: true, isAvailable: true },
      { name: 'Veg Fried Rice', price: 70, category: 'Main Course', rating: 4.4, prepTime: 10, isAvailable: true },
      { name: 'Masala Dosa', price: 60, category: 'Starters', rating: 4.7, prepTime: 8, isHot: true, isAvailable: true },
      { name: 'Samosa (2pcs)', price: 30, category: 'Snacks', rating: 4.3, prepTime: 5, isAvailable: true },
      { name: 'Gulab Jamun', price: 40, category: 'Desserts', rating: 4.9, prepTime: 3, isAvailable: true },
      { name: 'Chole Bhature', price: 80, category: 'Main Course', rating: 4.5, prepTime: 12, isAvailable: true },
      { name: 'Cold Coffee', price: 50, category: 'Snacks', rating: 4.6, prepTime: 4, isAvailable: true },
    ];
    await MenuItem.insertMany(items);
    res.json({ success: true, message: 'Menu seeded!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/availability', async (req, res) => {
  try {
    const { name, isAvailable } = req.body;
    await MenuItem.findOneAndUpdate({ name }, { isAvailable });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;