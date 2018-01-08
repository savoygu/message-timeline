const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  let user = this
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (e) {
      throw new Error(e)
    }
  },
  comparePassword2: function (password) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
          reject(err)
        } else {
          resolve(isMatch)
        }
      })
    })
  }
}

module.exports = mongoose.model('user', UserSchema)
