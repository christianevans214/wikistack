var mongoose = require("mongoose");
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!

mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

//Schema
// Page:
// title: String,
// url_name: String,
// owner_id: String,
// content: String,
// date: { type: Date, default: Date.now },
// status: Number
var pageSchema = new mongoose.Schema({
  title:    String,
  url_name: String,
  owner_id: String,
  content:  String,
  date:     { type: Date, default: Date.now },
  status:   Number
});

// User:
// name: {first:String, last:String}
// email: String
var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

//mongoose.model is then called to compile the schema into a collection-managing Page/User model

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

//make virtual field for the full_route
pageSchema.virtual('full_route').get(function(){
	return "/wiki/" + this.url_name;
});

module.exports = {
  Page: Page,
  User: User
};
