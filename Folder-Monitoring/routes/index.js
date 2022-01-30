var express = require('express')
var router = express.Router()

var indexController = require('../controller/indexController')

router.get('/read/:name', indexController.read)

module.exports = router;