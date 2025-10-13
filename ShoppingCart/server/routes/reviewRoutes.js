const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const RecentOrder = require('../models/orderModel');

// 取消按钮消失后才可评价：非 PLACED 或已超过 48h
function canReview(order) {
  if (!order) return false;
  if (order.status !== 'PLACED') return true;
  const ageMs = Date.now() - new Date(order.createdAt).getTime();
  return ageMs > 48 * 3600 * 1000;
}

// 健康检查（方便你确认路由已挂载）
router.get('/_health', (req, res) => res.json({ ok: true }));

// 提交评价（商品级或订单级 productId=null）
router.post('/', async (req, res) => {
  try {
    const { orderId, productId = null, rating, comment = '', userId } = req.body;
    if (!orderId || !userId || !rating) {
      return res.status(400).json({ message: 'orderId, userId, rating required' });
    }

    const order = await RecentOrder.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId !== String(userId)) return res.status(403).json({ message: 'Forbidden' });
    if (!canReview(order)) return res.status(400).json({ message: 'You can review after cancel window closes' });

    if (productId) {
      const has = order.items?.some(it => String(it.productId) === String(productId));
      if (!has) return res.status(400).json({ message: 'Product not in order' });
    }

    const rv = await Review.create({ orderId, productId, rating, comment, userId });
    res.json(rv);
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ message: 'You already reviewed this item/order' });
    res.status(500).json({ message: e.message });
  }
});

// 某商品的全部评价（用于“View reviews”）
router.get('/product/:productId', async (req, res) => {
  const list = await Review.find({ productId: req.params.productId }).sort('-createdAt').lean();
  res.json(list);
});

// 某用户在某订单下已写过的评价（RecentOrders 判断“已评/可评”）
router.get('/by-order/:orderId/:userId', async (req, res) => {
  const list = await Review.find({ orderId: req.params.orderId, userId: req.params.userId }).lean();
  res.json(list);
});

// 订单级评价（可选）
router.get('/order/:orderId', async (req, res) => {
  const list = await Review.find({ orderId: req.params.orderId, productId: null }).sort('-createdAt').lean();
  res.json(list);
});

module.exports = router;
