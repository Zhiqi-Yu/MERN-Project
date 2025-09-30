const mongooseObj = require('mongoose');

const orderItemSchema = new mongooseObj.Schema({
  productId: { type: mongooseObj.Schema.Types.ObjectId, required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  qty: { type: Number, required: true, min: 1 },
  category: { type: String, default: '' },
  subtotal: { type: Number, required: true, min: 0 },
}, { _id: false });

const recentOrderSchema = new mongooseObj.Schema({
  userId: { type: String, required: true, index: true }, // 简化：用 user.name 或本地 uid
  items: { type: [orderItemSchema], required: true },
  total: { type: Number, default: 0 },     // 小计
  payable: { type: Number, default: 0 },   // 应付（目前与 total 相同）
  status: {
    type: String,
    enum: ['PLACED', 'CANCELLED', 'DELIVERED'],
    default: 'PLACED'
  },
}, { timestamps: true });

module.exports = mongooseObj.model('RecentOrder', recentOrderSchema);
