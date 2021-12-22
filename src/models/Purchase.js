const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Vendor = require('./Vendor')

const PurchaseSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  total_price: {
    type: Number,
    default: 0,
    min: 0
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  codeIndex: {
    type: Number,
  },
  totalUntaxedAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalTaxes: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model('Purchase', PurchaseSchema)