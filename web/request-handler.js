var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};

archive.addUrlToList('google.com');
archive.addUrlToList('reddit.com');
archive.addUrlToList('amazon.com');
var arch = archive.readListOfUrls( archive.isUrlInList, 'www.google.com');
// console.log(arch);
// adsfasdfasdf
