const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  nickname: {type: String, trim: true},
  content: {type: String, trim: true},
  email: {type: String, trim: true},
  location: {
    ip: {type: String, trim: true},
    country: {type: String, trim: true},
    province: {type: String, trim: true},
    city: {type: String, trim: true},
    district: {type: String, trim: true}
  },
  avatar: {type: String, trim: true},
  createTime: {type: Date, default: Date.now},
  reviewed: {type: Boolean, default: true},
  reply: {
    text: {type: String, trim: true},
    time: {type: Date}
  }
})

module.exports = mongoose.model('message', MessageSchema)
