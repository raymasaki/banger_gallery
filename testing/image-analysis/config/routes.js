var express = require('express'),
  coversController = require('../controllers/covers_controller.js'),
  request = require('request'),
  bodyParser = require('body-parser'),
  editJson = require('../models/top20_data_edited.js'),
  newJson = require('../public/top20_data_new.json'),
  fs = require('fs');

module.exports = function(app) {

  app.get('/mixtapes', function(req, res) {
    res.send(coversController.getCovers());
  });

  app.get('/new', function(req, res) {
    // res.send(newJson);
    request('http://localhost:3000/top20_data_new.json', function (error, response, body) {
      res.send(body);
    });
  });

  app.get('/analysis/:id', function(req, res) {
    var mixtape = coversController.getMixtape(req.params.id);
    var imageUrl = mixtape.thumb_image;

    request('http://mkweb.bcgsc.ca/color-summarizer/?url=' + imageUrl + '&precision=vlow&text=1&json=1', function (error, response, body) {
      res.send(body);

      // console.log(newJson.mixtape_data);

      newJson.mixtape_data[req.params.id].analysis = JSON.parse(body);
      //
      // var data = {"mixtape_data" : newJson};

      fs.writeFile('public/top20_data_new.json', JSON.stringify(newJson), function (err) {
        console.log(err);
      });
    });
  });

  app.get('/save/:id', function(req, res) {
    // req.analysis = json
    // pass back into the object

  });

};
