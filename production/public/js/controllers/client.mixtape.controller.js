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
    artist: null,
    title: null,
    downloads: null,
    city: null,
    state: null,
    day: null,
    month: null,
    year: null,
    thumb_image: null,
    colors: [{
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }, {
      hexVal: '',
      percentage: null
    }],
    complexity: [],
    count: [],
    score: 0,
    similar: []
  };

  function showModal(index) {
    self.showDetail = true;

    self.current.similar = [];

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

    self.current.score = 100 - Math.ceil(((currScore - scoreMin) / (scoreMax - scoreMin)) * 100);


    // color spread
    var colorArr = self.all[index].analysis.clusters;

    for (var i = 0; i < 8; i++) {
      self.current.colors[i].hexVal = colorArr[i].hex[0];
      self.current.colors[i].percentage = colorArr[i].f;
    }

    findSimilar(self.all[index]);

    console.log(self.current.similar);

  }

  function findSimilar(currentCover) {

    var allCovers = self.all;

    // all the covers with a similar complexity score
    var similarComplex = [];

    allCovers.forEach( function(cover, index) {

      var lowEnd = currentCover.score - 6;
      var highEnd = currentCover.score + 6;

      if (cover.score >= lowEnd && cover.score <= highEnd) {
        similarComplex.push(cover);
      }

    });

    var indexCurrent = similarComplex.indexOf(currentCover);

    if (indexCurrent > -1) {
      similarComplex.splice(indexCurrent, 1);
    }

    var similarCoverArr = [];

    similarComplex.forEach(function (coverObj) {
      // console.log(coverObj.color);
      var similarComplexArr = coverObj.color;
      var currentCoverArr = currentCover.color;

      var similarCover = {matches: 0, id: null, score: 0};

      // similarCover.diff = similarComplexArr.diff(currentCoverArr).length;
      var similarities = count_similarities(similarComplexArr, currentCoverArr);

      similarCover.matches = similarities;
      similarCover.id = coverObj._id;
      similarCover.score = coverObj.score;

      similarCoverArr.push(similarCover);
    });

    // sorts similarCoverArr based on diff value
    similarCoverArr.sort(function (a, b) {
      if (a.matches > b.matches) {
        return -1;
      }
      if (a.matches < b.matches) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    if (similarCoverArr.length < 3) {
      for (var i = 0; i < similarCoverArr.length; i++) {
        self.current.similar.push(self.all[parseInt(similarCoverArr[i].id)]);
      }
    } else {
      for (var j = 0; j < 3; j++) {
        self.current.similar.push(self.all[parseInt(similarCoverArr[j].id)]);
      }
    }

  }

  // http://stackoverflow.com/questions/19948761/count-similarities-between-two-arrays-with-javascript
  function count_similarities(arrayA, arrayB) {
    var matches = 0;
    for (i=0;i<arrayA.length;i++) {
        if (arrayB.indexOf(arrayA[i]) != -1)
            matches++;
    }
    return matches;
  }
}
