var express = require('express'),
    coversController = require('../controllers/covers_controller.js');

module.exports = function(app) {

  app.get('/mixtapes', function (req, res) {
    res.send(coversController.getCovers());
  });

};
