const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  raison: {
    type: String,
  },
  phone: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Customer', CustomerSchema)