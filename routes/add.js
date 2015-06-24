var express = require('express');
var router = express.Router();

/* get add post page  */
router.get("/", function(req, res, next){
  res.render("add_page", { title: "Add a page"});
});

router.post("/submit", function(req,res,next){
  var models = require("../models/index.js");

  var urlName;
  if(typeof req.body.pageTitle != "undefined" && req.body.pageTitle !== ""){
    urlName = req.body.pageTitle.toLowerCase().replace(/ /gi,"_");
  }else{
    urlName = Math.random().toString(36).substring(2,7);
  }
  var tags = req.body.tags.split(" ");
  if(tags[0] === "") tags = [urlName];

  var page = new models.Page({"title": req.body.pageTitle, "content":req.body.content, "url_name": urlName, "tags": tags});
  page.save(function(err){
    if(err) return handleError(err);
    //if no error, saved!
  });
  //res.send(page);
  res.redirect("/");
});

module.exports = router;
