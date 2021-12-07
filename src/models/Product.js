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
  price: {
    type: Number,
  },
  amount: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', ProductSchema)