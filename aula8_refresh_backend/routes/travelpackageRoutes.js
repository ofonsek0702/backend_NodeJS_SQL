const express = require('express')
const router = express.Router()

const travelpackageController = require('../controllers/travelpackageController')

router.get('/', travelpackageController.gettravelpackage)
router.post('/',travelpackageController.addtravelpackage)

module.exports= router