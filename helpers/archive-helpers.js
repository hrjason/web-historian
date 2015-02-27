var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  //_dirname relative to the model

  //create object with three properties, stating the location of the archived site.
  //with path.join(_dirname) shortcut to access main folder.
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  //appending the sites.txt file
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

//Bridge function
exports.bridge = function(results, cb, arg, rcb, browser, ecb){
    cb(results, arg, rcb, browser, ecb);
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb, arg, rcb, browser, ecb){
  return fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) throw err;
    exports.bridge(data.split('\n'), cb, arg, rcb, browser, ecb);
  });
};

exports.isUrlInList = function(results, url, rcb, browser, ecb){
  if(browser === true) {
    if(results.indexOf(url) > -1){
      //if in list, send to loading page
      rcb();
    } else {
      ecb();
    }
  } else if(browser === false) {
    if(results.indexOf(url) > -1) {
      console.log('this will be a redirect');
      rcb();
    } else {
      exports.addUrlToList(url, rcb);
    }
  }
};

exports.addUrlToList = function(site, rcb){
  fs.appendFile(exports.paths.list, site + '\n', function (err) {
    if (err) throw err;
    console.log( site + ' has been added to the list');
    rcb();
  });
};

exports.isURLArchived = function(url, cb, rcb, browser, ecb){
  //check directory folder
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    if(exists) {
      cb(url);
    } else if(!exists && browser === false) {
      //if isn't archived, but not using browser - goal is too reach the addURLToList
      exports.readListOfUrls(exports.isUrlInList, url, rcb, browser, ecb);
    } else if(!exists && browser === true) {
      //if isnt archived, but using browser - goal is the end before addURLToList
      exports.readListOfUrls(exports.isUrlInList, url, rcb, browser, ecb);
    }
  });
};

exports.downloadUrls = function(){
  // worker function - chronjob will invoke this function which use our html fetcher
  //_.each function to invoke each array element (url in this case)
  // wipe sites.txt
    //http://stackoverflow.com/questions/17371224/node-js-delete-content-in-file
};
