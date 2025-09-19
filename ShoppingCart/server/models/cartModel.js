// server/models/cartModel.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true, min: 0 },
  qty:      { type: Number, required: true, min: 1, default: 1 },
  category: { type: String, default: '' },
  subtotal: { type: Number, required: true, min: 0 }, // calculated by price*qty
}, { _id: false });

const cartSchema = new mongoose.Schema({
  items:   { type: [cartItemSchema], default: [] },
  total:   { type: Number, required: true, min: 0 },
  coupon:  { type: String, default: null },
  status:  { type: String, enum: ['OPEN','CHECKED_OUT'], default: 'CHECKED_OUT' },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
