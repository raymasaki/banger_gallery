var express = require('express'),
  coversController = require('../controllers/covers_controller.js'),
  request = require('request'),
  bodyParser = require('body-parser'),
  editJson = require('../models/top20_data_edited.js'),
  newJson = require('../models/top20_data_new.json'),
  fs = require('fs');

module.exports = function(app) {

  app.get('/mixtapes', function(req, res) {
    res.send(coversController.getCovers());
  });

  app.get('/new', function(req, res) {
    res.send(newJson);
  });

  app.get('/analysis/:id', function(req, res) {
    var mixtape = coversController.getMixtape(req.params.id);
    var imageUrl = mixtape.thumb_image;

    request('http://mkweb.bcgsc.ca/color-summarizer/?url=' + imageUrl + '&precision=vlow&text=1&json=1', function (error, response, body) {
      res.send(body);

      editJson[req.params.id].analysis = JSON.parse(body);

      var data = {"data" : editJson};

      fs.writeFile('public/top20_data_new.json', JSON.stringify(data), function (err) {
        console.log(err);
      });
    });
  });

  app.get('/save/:id', function(req, res) {
    // req.analysis = json
    // pass back into the object

  });

};
