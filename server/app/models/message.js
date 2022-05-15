const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  nickname: { type: String, trim: true },
  content: String,
  email: { type: String, trim: true },
  location: {
    ip: String,
    country: String,
    province: String,
    city: String,
    district: String
  },
  avatar: String,
  createTime: { type: Date, default: Date.now },
  reviewed: { type: Boolean, default: true },
  reply: {
    text: String,
    time: Date
  }
})

module.exports = mongoose.model('Message', messageSchema)
