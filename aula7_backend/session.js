const session = require('express-session')
const crypto = require('crypto')

module.exports = session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false
})
