const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Vendor', VendorSchema)