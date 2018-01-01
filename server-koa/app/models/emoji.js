const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmojiSchema = new Schema({
  expression: {type: String, trim: true},
  meaning: {type: String, trim: true}
})

module.exports = mongoose.model('emoji', EmojiSchema)
