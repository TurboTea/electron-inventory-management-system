const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  total_price: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Sale', SaleSchema)