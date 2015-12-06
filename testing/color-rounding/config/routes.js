var express = require('express'),
  coversController = require('../controllers/covers_controller.js'),
  request = require('request'),
  bodyParser = require('body-parser'),
  editJson = require('../models/top20_data_edited.js'),
  newJson = require('../public/top20_data_new.json'),
  fs = require('fs');

module.exports = function(app) {


  /**********************  Color Rounding  **************************/

  app.get('/rounding/:id', function(req, res) {

    // Most prominent color
    var R = newJson.mixtape_data[req.params.id].analysis.clusters[0].rgb[0];
    var G = newJson.mixtape_data[req.params.id].analysis.clusters[0].rgb[1];
    var B = newJson.mixtape_data[req.params.id].analysis.clusters[0].rgb[2];

    // Average color
    // var R = newJson.mixtape_data[req.params.id].analysis.stats.rgb.r.avg[0];
    // var G = newJson.mixtape_data[req.params.id].analysis.stats.rgb.g.avg[0];
    // var B = newJson.mixtape_data[req.params.id].analysis.stats.rgb.b.avg[0];

    // 0 - 125 - 255
    // 0 - 62, 63 - 190, 191 - 255

    console.log('RGB: ' + R + ', ' + G + ', ' + B);

    var RGB = [];

    if (R < 62) {
      R = 0;
    } else if (R > 63 && R < 190) {
      R = 125;
    } else {
      R = 255;
    }

    RGB.push(R);

    if (G < 62) {
      G = 0;
    } else if (G > 63 && G < 190) {
      G = 125;
    } else {
      G = 255;
    }

    RGB.push(G);

    if (B < 62) {
      B = 0;
    } else if (B > 63 && B < 190) {
      B = 125;
    } else {
      B = 255;
    }

    RGB.push(B);

    RGB = RGB.join(', ');
    var rounding = null;

    switch (RGB) {
      case "0, 0, 0":
        rounding = 'black';
        break;

      case "125, 125, 125":
        rounding = 'gray';
        break;

      case "255, 255, 255":
        rounding = 'white';
        break;

      case "125, 0, 0":
        rounding = 'maroon';
        break;

      case "0, 125, 0":
        rounding = 'green';
        break;

      case "0, 0, 125":
        rounding = 'navy';
        break;

      case "255, 0, 0":
        rounding = 'red';
        break;

      case "0, 255, 0":
        rounding = 'green';
        break;

      case "0, 0, 255":
        rounding = 'blue';
        break;

      case "125, 125, 0":
        rounding = 'olive';
        break;

      case "125, 0, 125":
        rounding = 'purple';
        break;

      case "0, 125, 125":
        rounding = 'teal';
        break;

      case "255, 255, 0":
        rounding = 'yellow';
        break;

      case "255, 0, 255":
        rounding = 'magenta';
        break;

      case "0, 255, 255":
        rounding = 'cyan';
        break;

      case "125, 125, 255":
        rounding = 'lightblue';
        break;

      case "125, 255, 125":
        rounding = 'lime';
        break;

      case "255, 125, 125":
        rounding = 'salmon';
        break;

      case "255, 255, 125":
        rounding = 'lightyellow';
        break;

      case "255, 125, 255":
        rounding = 'pink';
        break;

      case "125, 255, 255":
        rounding = 'aquamarine';
        break;

      case "255, 0, 125":
        rounding = 'magenta';
        break;

      case "255, 125, 0":
        rounding = 'orange';
        break;

      case "0, 255, 125":
        rounding = 'green';
        break;

      case "125, 255, 0":
        rounding = 'lime';
        break;

      case "125, 0, 255":
        rounding = 'purple';
        break;

      case "0, 125, 255":
        rounding = 'blue';
        break;

      default:
        console.log('error');
        break;

    }

    res.send('RGB: ' + RGB + ' ' + rounding);

    var mixtape = coversController.getMixtape(req.params.id);

    newJson.mixtape_data[req.params.id].color = rounding;

    fs.writeFile('public/top20_data_new.json', JSON.stringify(newJson), function(err) {
      console.log(err);
    });

  });

  /**********************  Show all mixtapes JSON  **************************/


  app.get('/mixtapes', function(req, res) {
    res.send(coversController.getCovers());
  });


  /**********************  Show all mixtapes JSON new  **************************/

  app.get('/new', function(req, res) {
    // res.send(newJson);
    request('http://localhost:3000/top20_data_new.json', function(error, response, body) {
      res.send(body);
    });
  });


  /**********************  Color Analysis  **************************/

  app.get('/analysis/:id', function(req, res) {
    var mixtape = coversController.getMixtape(req.params.id);
    var imageUrl = mixtape.thumb_image;

    request('http://mkweb.bcgsc.ca/color-summarizer/?url=' + imageUrl + '&precision=vlow&text=1&json=1&num_clusters=8', function(error, response, body) {
      res.send(body);

      // Goes to the analysis of selected ID and passes in analysis JSON
      newJson.mixtape_data[req.params.id].analysis = JSON.parse(body);

      // overwrites json file with new data
      fs.writeFile('public/top20_data_new.json', JSON.stringify(newJson), function(err) {
        console.log(err);
      });
    });
  });




};
