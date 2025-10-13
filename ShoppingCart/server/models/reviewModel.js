const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const reviewSchema = new Schema(
  {
    orderId:   { type: Types.ObjectId, ref: 'RecentOrder', required: true },
    productId: { type: Types.ObjectId, ref: 'Product', default: null }, // null => 订单级评价
    userId:    { type: String, required: true }, // 你现在把 userName 存成字符串，就用 String
    rating:    { type: Number, min: 1, max: 5, required: true },
    comment:   { type: String, default: '' },
  },
  { timestamps: true }
);

// 同一用户对同一订单的同一商品（或订单级）只能评一次
reviewSchema.index({ orderId: 1, productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
