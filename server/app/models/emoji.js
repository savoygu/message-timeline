const mongoose = require('mongoose')
const { Schema } = mongoose

const emojiSchema = new Schema({
  expression: String,
  meaning: String
})

module.exports = mongoose.model('Emoji', emojiSchema)
