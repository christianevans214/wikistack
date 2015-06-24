var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Browse my wikistack', stack: [{title: "Fullstack Home", postBody: "blah", link:"/"}]});
});


module.exports = router;
