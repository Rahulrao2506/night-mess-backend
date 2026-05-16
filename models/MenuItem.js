const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: String,
  rating: { type: Number, default: 4.0 },
  prepTime: { type: Number, default: 10 },
  isAvailable: { type: Boolean, default: true },
  isHot: { type: Boolean, default: false },
  description: String,
  calories: Number
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);