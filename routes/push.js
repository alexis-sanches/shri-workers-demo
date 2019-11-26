var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/push', function(req, res, next) {
  res.render('push', { title: 'Express' });
});

module.exports = router;
