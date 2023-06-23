const express = require('express')
const router = express.Router()

const AuthenticationController = require('../controllers/authController')

router.post('/',AuthenticationController.login)
router.get('/',AuthenticationController.logout)

module.exports= router