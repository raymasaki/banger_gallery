app.controller('MixtapeCtrl', ['$log', '$http', '$filter', MixtapeCtrl]);

function MixtapeCtrl($log, $http, $filter) {

  var self = this;
  self.title = "Banger Gallery";
  self.all = [];

  self.showDetail = false;
  self.showModal = showModal;

  getCovers();

  function getCovers() {
    $http
      .get('http://localhost:3000/mixtapes')
      .then(function(res) {
        self.all = res.data;
      })
      .catch(function(res) {
        $log.error('failure', res);
      });
  }

  self.current = {
    artist : null,
    title : null,
    downloads : null,
    city : null,
    state : null,
    day : null,
    month : null,
    year : null,
    thumb_image : null,
    colors : [
      {hex: '', percentage: null},
      {hex: '', percentage: null},
      {hex: '', percentage: null},
      {hex: '', percentage: null},
      {hex: '', percentage: null},
      {hex: '', percentage: null},
      {hex: '', percentage: null},
      {hex: '', percentage: null}
    ]
  };

  function showModal(index) {
    self.current.artist = self.all[index].artist;
    self.current.title = self.all[index].title;
    self.current.downloads = self.all[index].downloads;
    self.current.city = self.all[index].city;
    self.current.state = self.all[index].state;
    self.current.day = self.all[index].day;
    self.current.month = self.all[index].month;
    self.current.year = self.all[index].year;
    self.current.thumb_image = self.all[index].thumb_image;

    var clusters = self.all[index].analysis.clusters;

    console.log(clusters[0].hex[0]);
    console.log(self.current.colors[0].hex);


    self.showDetail = true;

    for (var i = 0; i < 9; i++) {
      self.current.colors[i].hex = clusters[i].hex[0];
      self.current.colors[i].percentage = clusters[i].f;
    }

  }
}
