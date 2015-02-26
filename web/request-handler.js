var path = require('path');
var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET') {
    res.writeHead(200, header.headers);
    res.end('get');
    console.log('get working');
  } else
  if(req.method === 'OPTIONS') {
    res.writeHead(200, header.headers);
    res.end('options');
    console.log('OPTIONS WORKING');
  } else
  if(req.method === 'POST') {
    res.writeHead(201, header.headers);
    var urlObj = '';
    req.on('data', function(data) {
      urlObj += data;
    });
    req.on('end', function(){
      urlObj = JSON.parse(urlObj);
      // console.log(urlObj, urlObj.url )
      //eventually handle www issue, as well as lowercase
      archive.isURLArchived(urlObj.url.toLowerCase());
    });
    res.end('POST complete');
  }
};


