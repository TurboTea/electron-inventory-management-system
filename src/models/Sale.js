const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Customer = require('./Customer')

const SaleSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  total_price: {
    type: Number,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  codeIndex: {
    type: Number,
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

module.exports = mongoose.model('Sale', SaleSchema)