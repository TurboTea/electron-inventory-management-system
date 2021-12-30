const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  designation: {
    type: String,
  },
  name: {
    type: String,
    //required: [true, 'Log text is required'],
  },
  costPrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
  durability: {
    type: Boolean,
    default: false
  },
  qrCode: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  alertQuantity: {
    type: Number,
  },
  expirationDate: {
    type: Date,
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

module.exports = mongoose.model('Product', ProductSchema)