const mongooseObj = require('mongoose');

const productSchema = new mongooseObj.Schema(
  {
    name:   { type: String, required: true, trim: true },
    price:  { type: Number, required: true, min: 0 },
    desc:   { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  { timestamps: true }
);

module.exports = mongooseObj.model('Product', productSchema);
