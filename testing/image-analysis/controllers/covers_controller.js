var Covers = require('../models/mixtape_data_model.js');
var CoversNew = require('../models/top20_data_edited.js');
var request = require('request');

module.exports = {

  getCovers: function () {
    return Covers;
  },

  getMixtape: function (id) {
    return Covers[parseInt(id)];
  }

};
