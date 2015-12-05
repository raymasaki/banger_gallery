var Covers = require('../models/mixtape_data.json');

module.exports = {

  getCovers: function () {
    return Covers.mixtape_data;
  }

};
