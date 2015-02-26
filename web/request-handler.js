var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};


archive.isURLArchived('www.google.com');
archive.isURLArchived('www.amazon.com');
archive.isURLArchived('www.reddit.com');
