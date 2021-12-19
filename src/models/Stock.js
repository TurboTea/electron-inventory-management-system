const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Product = require('./Product')

const StockSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  amount: {
    type: Number
  },
  pmp: {
    type: Number
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

module.exports = mongoose.model('Stock', StockSchema)