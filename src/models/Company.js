const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new mongoose.Schema({
  companyName: {
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
  logo: {
    type: String,
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: 'Currency'
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


module.exports = mongoose.model('Company', CompanySchema)