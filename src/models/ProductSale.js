const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Product = require('./Product')
const Sale = require('./Sale')
const Tax = require('./Tax')

const ProductSaleSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  saleId: {
    type: Schema.Types.ObjectId,
    ref: 'Sale'
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

module.exports = mongoose.model('ProductSale', ProductSaleSchema)