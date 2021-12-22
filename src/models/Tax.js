const mongoose = require('mongoose')

const TaxSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  typeTax: {
    type: String,
  },
  valueTax: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Tax', TaxSchema)