var Covers = require('../models/server.covers.model.json');

module.exports = {

  getCovers: function () {
    return Covers.mixtape_data;
  }

};
