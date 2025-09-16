const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();

// POST /api/products - 创建
router.post('/', async (req, res, next) => {
  try {
    const { name, price, desc, rating } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'name and price is Required!!!' });
    }
    const doc = await Product.create({
      name: String(name).trim(),
      price: Number(price),
      desc: (desc || '').trim(),
      rating: Number(rating || 0)
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

// GET /api/products - 列表
router.get('/', async (req, res, next) => {
  try {
    const list = await Product.find({}).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
});

module.exports = router;
