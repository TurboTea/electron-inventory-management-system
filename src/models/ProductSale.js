const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Product = require('./Product')
const Sale = require('./Sale')

const ProductSaleSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  saleId: {
    type: Schema.Types.ObjectId,
    ref: 'Sale'
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