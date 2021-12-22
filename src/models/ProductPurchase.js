const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Product = require('./Product')
const Purchase = require('./Purchase')
const Tax = require('./Tax')

const ProductPurchaseSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  purchaseId: {
    type: Schema.Types.ObjectId,
    ref: 'Purchase'
  },
  taxId: {
    type: Schema.Types.ObjectId,
    ref: 'Tax'
  },
  amount: {
    type: Number,
    min: 0
  },
  price: {
    type: Number,
    min: 0
  },
  untaxedAmount: {
    type: Number,
    min: 0
  },
  taxes: {
    type: Number,
    min: 0
  },
  subTotal: {
    type: Number,
    min: 0
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