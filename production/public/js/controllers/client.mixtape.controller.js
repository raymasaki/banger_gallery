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
      .get('/covers')
      .then(function(res) {

        var coverData = res.data;

        for (var i = 0; i < coverData.length; i++) {
          coverData[i].thumb_image = 'https://s3-us-west-2.amazonaws.com/banger-gallery/covers' + jpgName(coverData[i].thumb_image);
        }

        function jpgName(str) {
          return str.substring(34);
        }

        self.all = coverData;
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
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null},
      {hexVal: '', percentage: null}
    ],
    complexity : [],
    count: [],
    score: 0
  };

  function showModal(index) {
    self.showDetail = true;

    self.current.artist = self.all[index].artist;
    self.current.title = self.all[index].title;
    self.current.downloads = self.all[index].downloads;
    self.current.city = self.all[index].city;
    self.current.state = self.all[index].state;
    self.current.day = self.all[index].day;
    self.current.month = self.all[index].month;
    self.current.year = self.all[index].year;
    self.current.thumb_image = self.all[index].thumb_image;
    self.current.complexity = self.all[index].colorAll;
    self.current.count = self.all[index].colorCount;

    // normalize complexity score out of 100
    var scoreMin = 15;
    var scoreMax = 136;
    var currScore = self.all[index].score;

    self.current.score = 100 - Math.ceil(((currScore - scoreMin)/(scoreMax - scoreMin))*100);



    // color spread
    var colorArr = self.all[index].analysis.clusters;

    for (var i = 0; i < 8; i++) {
      self.current.colors[i].hexVal = colorArr[i].hex[0];
      self.current.colors[i].percentage = colorArr[i].f;
    }

  }
}
