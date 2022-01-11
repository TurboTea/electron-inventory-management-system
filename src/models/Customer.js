const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  raison: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  mobile: {
    type: String,
  },
  statisticalIdentifierNumber: {
    type: String,
  },
  taxIdentifierNumber: {
    type: String,
  },
  commercialRegisterNumber: {
    type: String,
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

module.exports = mongoose.model('Customer', CustomerSchema)