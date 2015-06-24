var marked = require('marked');


module.exports = function(swig) {
  var markedFilter = function (body) {
  return marked(body);
  };
  var page_link = function (doc) {
    console.log(doc);
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='"+doc.full_route+"'>"+link_name+"</a>";
  };
  page_link.safe = true;
  markedFilter.safe = true;

  swig.setFilter('marked', markedFilter);
  swig.setFilter('page_link', page_link);
};