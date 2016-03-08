var express = require('express');
var router = express.Router();
var connection = require('./../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(connection);
});

module.exports = router;
