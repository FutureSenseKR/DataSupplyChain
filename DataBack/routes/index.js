var express = require('express');
var router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */

router.get('/read/:name', indexController.read)
router.post('/add', indexController.add)

module.exports = router;
