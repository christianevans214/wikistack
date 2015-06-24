var express = require('express');
var router = express.Router()

/* GET home page. */

//Will need to be able to pull all the wikipedia articles coming in!
//Can try 
	// var models = require("../models/index.js");
	// models.Page.find('paramamtersToFind').where('....')...

//Can also delete things if you want! using
	//models.Page.remove({'}parameters'},function(err){...})

//Can update things using:
	// var query = { name: 'borne' };
	// Model.update(query, { name: 'jason borne' }, options, callback)
// is sent as
//Model.update(query, { $set: { name: 'jason borne' }}, options, callback)
// if overwrite option is false. If overwrite is true, sent without the $set wrapper.

// router.post('/', function(req,res,next){
// 	var tags = req.body.tagSearch.toLowerCase().split(" ");
// 	searchByTags(res, tags);

// })

router.get('/search', function(req,res,next){
	var tags = req.query.tagSearch.toLowerCase().split(" ");
	searchByTags(res, tags);

})

router.get("/search/:tagName", function(req, res, next){
	var tags = [req.params.tagName.toLowerCase()];
	searchByTags(res, tags);

});

//should be moved into models
var searchByTags = function(res, tags){
	var models = require("../models/index.js");
	models.Page.find({
		tags: {$in: tags}
	}).exec(function(err,data){
		if (err) res.send(err);
		if (data.length === 0 ) res.render('index', {title: "Search was empty"});
		else {
			res.render('index', {title: 'Search results', stack: data});
		
		}
	})
}

router.get('/wiki/:url_name', function(req, res, next){
	var models = require("../models/index.js");
	models.Page.find({url_name: req.params.url_name}).exec(function(err,data){
		var tags = data[0].tags;
		res.render('page_view', {page: data[0], tags: tags})
	});
})

router.get('/', function(req, res, next) {
	var models = require("../models/index.js");
	models.Page.find(function(err,data){
		if (err) res.send(err);
		res.render('index', {title: 'Browse my wikistack', stack: data});
	})
});



router.get('/wiki/:url_name/similarPages', function(req,res){
	//res.send(req.params.url_name)
	var models = require("../models/index.js");
	models.Page.find({url_name: req.params.url_name}).exec(function(err,data){
		var searchArr = [];
		var count = 0;
		var dataTags = data[0].tags;
		dataTags.forEach(function(tag){
			tag = [tag];
			models.Page.find({tags: {$in: tag}, url_name: {$ne: req.params.url_name}}).exec(function(err,data){
				data.forEach(function(dataObject){
					searchArr.push(dataObject);
				})
				count++;
				if (count === dataTags.length){
					res.render('index', {title: "Similar Pages", stack: searchArr});
				}
			})

		})
	});
})


module.exports = router;
