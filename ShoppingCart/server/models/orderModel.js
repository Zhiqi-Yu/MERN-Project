// server/models/orderModel.js
const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

/**
 * 每个订单项
 * - subtotal 改为非必填，默认按照 price*qty 自动算，保留两位小数
 */
const orderItemSchema = new Schema(
  {
    productId: { type: Types.ObjectId, required: false },
    name:      { type: String, required: true },
    price:     { type: Number, required: true, min: 0 },
    qty:       { type: Number, required: true, min: 1 },
    category:  { type: String, default: '' },

    // 原来是 required: true，这样前端必须传；改成默认用 price*qty 生成
    subtotal: {
      type: Number,
      min: 0,
      default: function () {
        const p = Number(this.price || 0);
        const q = Number(this.qty || 0);
        return +(p * q).toFixed(2);
      },
    },
  },
  { _id: false }
);

/**
 * 订单（RecentOrder）
 * - 新增字段：
 *    - subtotal: 订单层面小计（=items.subtotal 之和）
 *    - discount: 折扣金额
 *    - coupon:   { code, percent } （percent 自动裁剪到 0~90）
 *    - paidTotal: 实付（=subtotal - discount）
 * - 兼容旧字段：
 *    - total   继续保留，值与 subtotal 同步
 *    - payable 继续保留，值与 paidTotal 同步
 */
const recentOrderSchema = new Schema({
  userId: { type: String, required: true, index: true },
  items:  { type: [orderItemSchema], required: true },

  // ✅ 新增金额相关字段（务必加上，否则保存时会被丢弃）
  subtotal: { type: Number, default: 0 },      // 小计
  discount: { type: Number, default: 0 },      // 折扣金额
  coupon: {
    code:    { type: String, default: null },  // 券码
    percent: { type: Number, default: 0 },     // 折扣百分比（0~90）
  },
  paidTotal: { type: Number, default: 0 },     // 实付

  // 兼容你原来的字段（可保留）
  total:   { type: Number, default: 0 },
  payable: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['PLACED', 'PAID', 'CANCELLED', 'DELIVERED'], // ← 加上 PAID
    default: 'PLACED',
  },
}, { timestamps: true });

/**
 * 自动计算钩子：
 * - 逐项补全 item.subtotal
 * - 汇总 subtotal
 * - 基于 coupon.percent 计算 discount & paidTotal
 * - 同步旧字段 total/payable
 */
recentOrderSchema.pre('validate', function (next) {
  try {
    // 1) 先确保每个 item 的 subtotal 有值
    this.items = (this.items || []).map((it) => {
      const p = Number(it.price || 0);
      const q = Number(it.qty || 0);
      if (typeof it.subtotal !== 'number') {
        it.subtotal = +(p * q).toFixed(2);
      }
      return it;
    });

    // 2) 订单小计
    const subtotal = (this.items || []).reduce((sum, it) => sum + Number(it.subtotal || 0), 0);
    this.subtotal = +subtotal.toFixed(2);

    // 3) 折扣
    const percent = Math.max(0, Math.min(90, Number(this.coupon?.percent || 0)));
    this.coupon = this.coupon || {};
    this.coupon.percent = percent;

    const discount = +(this.subtotal * (percent / 100)).toFixed(2);
    this.discount = discount;

    // 4) 实付
    const paid = +(this.subtotal - discount).toFixed(2);
    this.paidTotal = paid;

    // 5) 向下兼容旧字段
    this.total = this.subtotal;
    this.payable = this.paidTotal;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('RecentOrder', recentOrderSchema);
