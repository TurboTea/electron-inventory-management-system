const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Product = require('./Product')
const Purchase = require('./Purchase')

const ProductPurchaseSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  purchaseId: {
    type: Schema.Types.ObjectId,
    ref: 'Purchase'
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('ProductPurchase', ProductPurchaseSchema)