var express = require('express'),
  coversController = require('../controllers/covers_controller.js'),
  request = require('request'),
  bodyParser = require('body-parser'),
  editJson = require('../models/top20_data_edited.js'),
  newJson = require('../public/top20_data_new.json'),
  fs = require('fs');

module.exports = function(app) {


  /**********************  Complexity Score  **************************/

  app.get('/score/:id', function(req, res) {

    var firstHex      = newJson.mixtape_data[req.params.id].colorAll[0].percent;
    var secondHex     = newJson.mixtape_data[req.params.id].colorAll[1].percent;
    var thirdHex      = newJson.mixtape_data[req.params.id].colorAll[2].percent;
    var sixthHex      = newJson.mixtape_data[req.params.id].colorAll[5].percent;
    var seventhHex    = newJson.mixtape_data[req.params.id].colorAll[6].percent;
    var eighthHex     = newJson.mixtape_data[req.params.id].colorAll[7].percent;
    var firstCount    = newJson.mixtape_data[req.params.id].colorCount[0].percent;
    // var secondCount   = newJson.mixtape_data[req.params.id].colorCount[1].percent;
    var len           = newJson.mixtape_data[req.params.id].colorCount.length;

    var numOne = firstHex * 100 - eighthHex * 100;
    var numTwo = secondHex * 100 - seventhHex * 100;
    var numThree = thirdHex * 100 - sixthHex * 100;

    var sum = numOne + numTwo + numThree + firstCount * 100; //+ secondCount * 100;

    var score = 0;

    if (len === 4) {
      score = Math.round((sum/2) * 1.1);
    } else if (len === 3) {
      score = Math.round((sum/2) * 1.2);
    } else if (len === 2) {
      score = Math.round((sum/2) * 1.4);
    } else if (len === 1) {
      score = Math.round((sum/2) * 1.5);
    } else {
      score = Math.round((sum/2));
    }

    res.send('score: ' + score);

    var mixtape = coversController.getMixtape(req.params.id);

    newJson.mixtape_data[req.params.id].score = score;

    fs.writeFile('public/top20_data_new.json', JSON.stringify(newJson), function(err) {
      console.log(err);
    });

  });


  /**********************  Show all mixtapes JSON new  **************************/

  app.get('/new', function(req, res) {
    // res.send(newJson);
    request('http://localhost:3000/top20_data_new.json', function(error, response, body) {
      res.send(body);
    });
  });




};
