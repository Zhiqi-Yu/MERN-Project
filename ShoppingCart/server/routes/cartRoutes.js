// server/routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router();

// POST /api/carts  ——（Checkout）
router.post('/', async (req, res, next) => {
  try {
    const { items = [], coupon = null } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart items required' });
    }
    const mapped = items.map(it => ({
      product:  it.productId,
      name:     it.name,
      price:    Number(it.price),
      qty:      Number(it.qty || 1),
      category: it.category || '',
      subtotal: Number(it.price) * Number(it.qty || 1)
    }));
    const total = mapped.reduce((s,i) => s + i.subtotal, 0);
    const doc = await Cart.create({ items: mapped, total, coupon, status: 'CHECKED_OUT' });
    res.status(201).json({ cartId: doc._id, total: doc.total, createdAt: doc.createdAt });
  } catch (e) { next(e); }
});

// Optional：GET /api/carts/:id 
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (e) { next(e); }
});

module.exports = router;
