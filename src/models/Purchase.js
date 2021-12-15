const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Provider = require('./Provider')

const PurchaseSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  total_price: {
    type: Number,
  },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: 'Provider'
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