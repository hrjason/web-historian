var path = require('path');
var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers.js');
var qs = require('querystring');
// require more modules/folders here!

archive.downloadUrls();

exports.handleRequest = function (req, res) {
  if(req.method === 'GET') {
    if(req.url === '/'){
      header.serveAssets(res, archive.paths.siteAssets + '/index.html', function(content){
          // console.log('readingtop');
          res.writeHead(200, header.headers);
          // console.log('reading');
          res.end(content);
      });
    } else {
      var urlString = req.url;
      var urlShortened = urlString.substring(1);
      //cb function
      archive.isURLArchived(urlShortened, function(url){
        header.serveAssets(res, archive.paths.archivedSites + req.url, function(content){
            res.writeHead(200, header.headers);
            res.end(content);
        });
      //rcb loading
      }, function() {
        header.serveAssets(res, archive.paths.siteAssets + '/loading.html', function(content){
            res.writeHead(200, header.headers);
            res.end(content);
        });
      //browser check
      }, true,
      //404 header
        function() {
            res.writeHead(404, header.headers);
            res.end('not found');
      });
    }
  } else
  if(req.method === 'OPTIONS') {
    res.writeHead(200, header.headers);
    res.end('options');
    console.log('OPTIONS WORKING');
  } else
  if(req.method === 'POST') {
    //console.log(req);
    // res.writeHead(201, header.headers);
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function(){
      var key = qs.parse(body);
      //cb function
      archive.isURLArchived(key.url, function(url){
        header.serveAssets(res, archive.paths.archivedSites + '/' + key.url, function(content){
            res.writeHead(302, header.headers);
            res.end(content);
        });
      //rcb loading
      }, function() {
        header.serveAssets(res, archive.paths.siteAssets + '/loading.html', function(content){
            res.writeHead(302, header.headers);
            res.end(content);
        });
      //browser check
      }, false,
      //404 header
        function() {
            res.writeHead(404, header.headers);
            res.end('not found');
      });
    });
  }
};


