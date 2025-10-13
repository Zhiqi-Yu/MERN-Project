const express = require('express');
const RecentOrder = require('../models/orderModel');
const router = express.Router();

// POST /api/orders  创建订单
router.post('/', async (req, res, next) => {
  try {
    const { userId, items = [], couponCode = null, couponPercent = 0 } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'userId & items are required' });
    }

    // 规范化条目 & 小计
    const normalized = items.map(i => {
      const price = Number(i.price || 0);
      const qty   = Number(i.qty || 0);
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

    // 计算折扣 & 实付（服务端说了算）
    const percent  = Math.max(0, Math.min(90, Number(couponPercent) || 0));
    const discount = +(subtotal * (percent / 100)).toFixed(2);
    const paidTotal = +(subtotal - discount).toFixed(2);

    // 保存
    const doc = await RecentOrder.create({
      userId: String(userId),
      items: normalized,
      subtotal,
      discount,
      coupon: { code: couponCode, percent },
      paidTotal,
      // 保持与你旧字段兼容
      total: subtotal,
      payable: paidTotal,
      status: 'PAID', // 你的业务如果是“下单即支付”，就用 PAID；否则用 PLACED
    });

    // 返回关键字段，前端随后跳转 /payment/:id 再读一次也 OK
    res.status(201).json({
      orderId: doc._id,
      paidTotal: doc.paidTotal,
      subtotal: doc.subtotal,
      discount: doc.discount,
      couponCode: doc.coupon?.code || null,
      effectivePercent: doc.coupon?.percent || 0,
    });
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

router.get('/:id', async (req, res) => {
  try {
    const order = await RecentOrder.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderId = order._id;       // 兼容前端显示
    order.total   = order.subtotal;  // 兼容旧字段
    order.payable = order.paidTotal; // 兼容旧字段
    return res.json(order);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});


module.exports = router;
