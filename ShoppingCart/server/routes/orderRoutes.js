const express = require('express');
const RecentOrder = require('../models/orderModel');
const router = express.Router();

// POST /api/orders  创建订单
router.post('/', async (req, res, next) => {
  try {
    const { userId, items = [] } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'userId & items are required' });
    }

    // 服务端重算金额，防前端篡改
    const normalized = items.map(i => {
      const price = Number(i.price || 0);
      const qty = Number(i.qty || 0);
      return {
        productId: i.productId || i.product || undefined,
        name: String(i.name || ''),
        price,
        qty,
        category: String(i.category || ''),
        subtotal: +(price * qty).toFixed(2),
      };
    });

    const subtotal = normalized.reduce((s, i) => s + i.subtotal, 0);

    const doc = await RecentOrder.create({
      userId: String(userId),
      items: normalized,
      total: +subtotal.toFixed(2),
      payable: +subtotal.toFixed(2),
    });

    res.status(201).json({ orderId: doc._id, order: doc });
  } catch (e) { next(e); }
});

// GET /api/orders?userId=xxx  我的订单列表
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const list = await RecentOrder.find(filter).sort({ createdAt: -1 }).lean();

    const now = Date.now();
    const withFlags = list.map(o => {
      const ageMs = now - new Date(o.createdAt).getTime();
      const within48h = ageMs <= 48 * 3600 * 1000;
      const isCancelable = o.status === 'PLACED' && within48h;
      // 计算型 delivered（不强制落库，演示足够）
      const computedStatus = isCancelable
        ? o.status
        : (o.status === 'PLACED' ? 'DELIVERED' : o.status);
      return { ...o, isCancelable, computedStatus };
    });

    res.json(withFlags);
  } catch (e) { next(e); }
});

// PATCH /api/orders/:id/cancel  取消订单（48h内）
router.patch('/:id/cancel', async (req, res, next) => {
  try {
    const id = req.params.id;
    const o = await RecentOrder.findById(id);
    if (!o) return res.status(404).json({ message: 'Order not found' });
    if (o.status !== 'PLACED') {
      return res.status(409).json({ message: 'Order not cancellable' });
    }
    const ageMs = Date.now() - o.createdAt.getTime();
    if (ageMs > 48 * 3600 * 1000) {
      return res.status(400).json({ message: 'Order past cancel window' });
    }
    o.status = 'CANCELLED';
    await o.save();
    res.json({ ok: true, orderId: o._id, status: o.status });
  } catch (e) { next(e); }
});

module.exports = router;
