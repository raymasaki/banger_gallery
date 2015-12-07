var express = require('express'),
  coversController = require('../controllers/covers_controller.js');

module.exports = function(app) {

  app.get('/mixtapes', function(req, res) {
    res.send(coversController.getCovers());
  });

  /**********************  All permutations  **************************/

  app.get('/permutations/', function(req, res) {

    var a = [0, 125, 255];
    var solution = [];

    a.forEach(function(value1) {
      a.forEach(function(value2) {
        a.forEach(function(value3) {
          solution.push([value1, value2, value3]);
        });
      });
    });

    res.send(solution);

  });

};
