const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
  imageUrl: {
    type: String,
  },
  alertQuantity: {
    type: Number,
  },
  expirationDate: {
    type: Date,
  },
  familyId: {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  unitId: {
    type: Schema.Types.ObjectId,
    ref: 'Unit'
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