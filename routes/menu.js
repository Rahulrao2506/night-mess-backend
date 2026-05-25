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
      { name: 'Butter Chicken', price: 80, category: 'Main Course', rating: 4.8, prepTime: 15, isHot: true, description: 'Creamy tomato based curry', calories: 450 },
      { name: 'Paneer Tikka', price: 70, category: 'Starters', rating: 4.6, prepTime: 10, isHot: true, description: 'Grilled cottage cheese', calories: 320 },
      { name: 'Veg Fried Rice', price: 50, category: 'Rice', rating: 4.3, prepTime: 12, description: 'Wok tossed rice with veggies', calories: 380 },
      { name: 'Dal Makhani', price: 60, category: 'Main Course', rating: 4.5, prepTime: 20, description: 'Slow cooked black lentils', calories: 290 },
      { name: 'Masala Dosa', price: 40, category: 'South Indian', rating: 4.7, prepTime: 8, isHot: true, description: 'Crispy rice crepe with potato filling', calories: 250 },
      { name: 'Aloo Paratha', price: 35, category: 'Breakfast', rating: 4.4, prepTime: 10, description: 'Stuffed flatbread with butter', calories: 310 },
      { name: 'Maggi', price: 30, category: 'Snacks', rating: 4.9, prepTime: 5, isHot: true, description: 'Classic instant noodles', calories: 200 },
      { name: 'Cold Coffee', price: 45, category: 'Beverages', rating: 4.6, prepTime: 3, description: 'Blended iced coffee', calories: 180 },
    ];
    await MenuItem.insertMany(items);
    res.json({ success: true, message: 'Menu seeded with 8 items!' });
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
router.patch('/availability', async (req, res) => {
  try {
    const { name, isAvailable } = req.body;
    await MenuItem.findOneAndUpdate({ name }, { isAvailable });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;