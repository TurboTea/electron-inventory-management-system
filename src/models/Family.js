const mongoose = require('mongoose')

const FamilySchema = new mongoose.Schema({
  name: {
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

module.exports = mongoose.model('Family', FamilySchema)