var express = require('express');
var coversHelper = require('../helpers/server.covers.helper.js');

module.exports = function(app) {

  app.get('/covers', function(req, res) {
    res.send(coversHelper.getCovers());
  });

};
