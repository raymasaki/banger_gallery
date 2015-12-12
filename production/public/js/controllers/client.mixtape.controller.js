app.controller('MixtapeCtrl', ['$log', '$http', '$filter', MixtapeCtrl]);

// app.directive('scroll', function ($window) {
//   return function(scope, element, attrs) {
//       angular.element($window).bind('scroll', function() {
//            if (this.pageYOffset >= 100) {
//                scope.boolChangeClass = true;
//                console.log('Scrolled below header.');
//            } else {
//                scope.boolChangeClass = false;
//                console.log('Header is in view.');
//            }
//           scope.$apply();
//       });
//   };
// });

function MixtapeCtrl($log, $http, $filter) {

  var self = this;
  self.all = [];

  self.showDetail = false;
  self.showArtist = false;
  self.showModal = showModal;
  self.currArtist = null;

  self.fadeHover = function() {
    angular.element('.fade').css('opacity', '.2');
  };

  self.fadeOut = function() {
    angular.element('.fade').css('opacity', '1');
  };

  self.selectedArtist = function(selected) {
    self.currArtist = selected.originalObject.name;
  };

  self.artistFilterOpen = false;

  self.artistFilter = function() {

    if (self.artistFilterOpen === false){
      angular.element('.artist-filter').removeClass('hidden');
      angular.element('.artist-filter').addClass('visible');
      self.artistFilterOpen = true;

      angular.element('.color-filter').removeClass('visible');
      angular.element('.color-filter').addClass('hidden');
      self.colorFilterOpen = false;

      angular.element('.state-filter').removeClass('visible');
      angular.element('.state-filter').addClass('hidden');
      self.stateFilterOpen = false;

      angular.element('.sort').removeClass('visible');
      angular.element('.sort').addClass('hidden');
      self.sortOpen = false;

    } else {
      angular.element('.artist-filter').removeClass('visible');
      angular.element('.artist-filter').addClass('hidden');
      self.artistFilterOpen = false;
    }

  };

  self.stateFilterOpen = false;

  self.stateFilter = function() {

    if (self.stateFilterOpen === false){
      angular.element('.state-filter').removeClass('hidden');
      angular.element('.state-filter').addClass('visible');
      self.stateFilterOpen = true;

      angular.element('.color-filter').removeClass('visible');
      angular.element('.color-filter').addClass('hidden');
      self.colorFilterOpen = false;

      angular.element('.artist-filter').removeClass('visible');
      angular.element('.artist-filter').addClass('hidden');
      self.artistFilterOpen = false;

      angular.element('.sort').removeClass('visible');
      angular.element('.sort').addClass('hidden');
      self.sortOpen = false;

    } else {
      angular.element('.state-filter').removeClass('visible');
      angular.element('.state-filter').addClass('hidden');
      self.stateFilterOpen = false;
    }

  };

  self.colorFilterOpen = false;

  self.colorFilter = function() {

    if (self.colorFilterOpen === false){
      angular.element('.color-filter').removeClass('hidden');
      angular.element('.color-filter').addClass('visible');
      self.colorFilterOpen = true;

      angular.element('.state-filter').removeClass('visible');
      angular.element('.state-filter').addClass('hidden');
      self.stateFilterOpen = false;

      angular.element('.artist-filter').removeClass('visible');
      angular.element('.artist-filter').addClass('hidden');
      self.artistFilterOpen = false;

      angular.element('.sort').removeClass('visible');
      angular.element('.sort').addClass('hidden');
      self.sortOpen = false;
    } else {
      angular.element('.color-filter').removeClass('visible');
      angular.element('.color-filter').addClass('hidden');
      self.colorFilterOpen = false;
    }

  };

  self.sortOpen = false;

  self.sortList = function() {

    if (self.sortOpen === false){
      angular.element('.sort').removeClass('hidden');
      angular.element('.sort').addClass('visible');
      angular.element('.sort-button').addClass('active');
      self.sortOpen = true;

      angular.element('.state-filter').removeClass('visible');
      angular.element('.state-filter').addClass('hidden');
      self.stateFilterOpen = false;

      angular.element('.artist-filter').removeClass('visible');
      angular.element('.artist-filter').addClass('hidden');
      self.artistFilterOpen = false;

      angular.element('.color-filter').removeClass('visible');
      angular.element('.color-filter').addClass('hidden');
      self.colorFilterOpen = false;
    } else {
      angular.element('.sort').removeClass('visible');
      angular.element('.sort-button').removeClass('active');
      angular.element('.sort').addClass('hidden');
      self.sortOpen = false;
    }

  };



  getCovers();

  self.colorList = [
    {color: 'black'},
    {color: 'navy'},
    {color: 'blue'},
    {color: 'forest'},
    {color: 'teal'},
    {color: 'azure'},
    {color: 'green'},
    {color: 'spring'},
    {color: 'cyan'},
    {color: 'maroon'},
    {color: 'purple'},
    {color: 'violet'},
    {color: 'olive'},
    {color: 'gray'},
    {color: 'cornflower'},
    {color: 'lime green'},
    {color: 'neon green'},
    {color: 'aquamarine'},
    {color: 'red'},
    {color: 'rose'},
    {color: 'magenta'},
    {color: 'orange'},
    {color: 'salmon'},
    {color: 'pink'},
    {color: 'yellow'},
    {color: 'beige'},
    {color: 'white'}
  ];

  self.artistList = [
    {name: '2 Chainz'},
    {name: '2 Pistols'},
    {name: '50 Cent'},
    {name: 'A$AP Mob'},
    {name: 'A$AP Rocky'},
    {name: 'Ab-Soul'},
    {name: 'Ace Hood'},
    {name: 'Action Bronson'},
    {name: 'Action Bronson'},
    {name: 'The Alchemist'},
    {name: 'Akon'},
    {name: 'ASAP Ferg'},
    {name: 'Asher Roth'},
    {name: 'August Alsina'},
    {name: 'B.o.B'},
    {name: 'Berner'},
    {name: 'Big K.R.I.T.'},
    {name: 'Big Sean'},
    {name: 'Birdman'},
    {name: 'Boosie Bad Azz'},
    {name: 'Busta Rhymes'},
    {name: 'Camron'},
    {name: 'Casey Veggies'},
    {name: 'Cassidy'},
    {name: 'Cassie'},
    {name: 'Chance The Rapper'},
    {name: 'Chevy Woods'},
    {name: 'Chiddy Bang'},
    {name: 'Chief Keef'},
    {name: 'Childish Gambino'},
    {name: 'Chinx'},
    {name: 'Chip Tha Ripper'},
    {name: 'Chris Brown'},
    {name: 'Chris Webby'},
    {name: 'Cory Gunz'},
    {name: 'Curren$y'},
    {name: 'CyHi The Prynce'},
    {name: 'D-Pryde'},
    {name: 'D12'},
    {name: 'Danny Brown'},
    {name: 'Dej Loaf'},
    {name: 'Diggy'},
    {name: 'Dizzy Wright'},
    {name: 'DJ Esco'},
    {name: 'Dom Kennedy'},
    {name: 'Domo Genesis'},
    {name: 'Don Trip'},
    {name: 'Starlito'},
    {name: 'Drake'},
    {name: 'Earl Sweatshirt'},
    {name: 'Fabolous'},
    {name: 'Fat Trel'},
    {name: 'Fetty Wap'},
    {name: 'Flatbush Zombies'},
    {name: 'Frank Ocean'},
    {name: 'Fred The Godson'},
    {name: 'Freddie Gibbs'},
    {name: 'Fredo Santana'},
    {name: 'French Montana'},
    {name: 'Coke Boys'},
    {name: 'Fetty Wap'},
    {name: 'Future'},
    {name: 'Game'},
    {name: 'Gucci Mane'},
    {name: 'Gudda Gudda'},
    {name: 'Gunplay'},
    {name: 'Harry Fraud'},
    {name: 'Huey Mack & Mike Stud'},
    {name: 'Hustle Gang'},
    {name: 'J. Cole'},
    {name: 'Jadakiss'},
    {name: 'Jaden Smith'},
    {name: 'Jay-Z'},
    {name: 'Jeremih'},
    {name: 'Jhene Aiko'},
    {name: 'Jim Jones'},
    {name: 'Joe Budden'},
    {name: 'Joey Bada$$'},
    {name: 'Juelz Santana'},
    {name: 'Juicy J'},
    {name: 'K Camp'},
    {name: 'K. Michelle'},
    {name: 'Kanye West'},
    {name: 'Kendrick Lamar'},
    {name: 'Jay Rock'},
    {name: 'Kevin Cossom'},
    {name: 'Kevin Gates'},
    {name: 'Kid Cudi'},
    {name: 'Kid Ink'},
    {name: 'King Los'},
    {name: 'King Louie'},
    {name: 'Kirko Bangz'},
    {name: 'Lecrae'},
    {name: 'Lil B'},
    {name: 'Lil Bibby'},
    {name: 'Lil Boosie'},
    {name: 'Lil Durk'},
    {name: 'Lil Herb'},
    {name: 'Lil Reese'},
    {name: 'Lil Snupe'},
    {name: 'Lil Wayne'},
    {name: 'Lloyd Banks'},
    {name: 'Logic'},
    {name: 'Los'},
    {name: 'Ludacris'},
    {name: 'Lupe Fiasco'},
    {name: 'Mac Miller'},
    {name: 'Machine Gun Kelly'},
    {name: 'Masspike Miles'},
    {name: 'Meek Mill'},
    {name: 'Memphis Bleek'},
    {name: 'Mick Jenkins'},
    {name: 'Migos'},
    {name: 'Miguel'},
    {name: 'Mike Posner'},
    {name: 'Nicki Minaj'},
    {name: 'Nipsey Hussle'},
    {name: 'Omarion'},
    {name: 'Papoose'},
    {name: 'Paul Wall'},
    {name: 'Plies'},
    {name: 'Pro Era'},
    {name: 'Problem'},
    {name: 'Puff Daddy'},
    {name: 'Pusha T'},
    {name: 'Raekwon'},
    {name: 'Ransom'},
    {name: 'Red Cafe'},
    {name: 'Remy Ma'},
    {name: 'Rich Gang'},
    {name: 'Rich Homie Quan'},
    {name: 'Rick Ross'},
    {name: 'Rockie Fresh'},
    {name: 'Rocko'},
    {name: 'Roscoe Dash'},
    {name: 'Schoolboy Q'},
    {name: 'Shy Glizzy'},
    {name: 'Shyne'},
    {name: 'Sir Michael Rocks'},
    {name: 'Slaughterhouse'},
    {name: 'Slim Thug'},
    {name: 'Snoop Dogg'},
    {name: 'Soulja Boy'},
    {name: 'Stalley'},
    {name: 'Styles P'},
    {name: 'SwizZz'},
    {name: 'T-Pain'},
    {name: 'T.I.'},
    {name: 'Talib Kweli'},
    {name: 'The Underachievers'},
    {name: 'The Weeknd'},
    {name: 'Torch'},
    {name: 'Trademark Da Skydiver'},
    {name: 'Trae Tha Truth'},
    {name: 'Travi$ Scott'},
    {name: 'Travis Porter'},
    {name: 'Trey Songz'},
    {name: 'Trinidad James'},
    {name: 'Twista'},
    {name: 'Ty Dolla $ign'},
    {name: 'Tyga'},
    {name: 'Tyler, The Creator'},
    {name: 'Vado'},
    {name: 'Vic Mensa'},
    {name: 'Waka Flocka Flame'},
    {name: 'Wale'},
    {name: 'Wiz Khalifa'},
    {name: 'Wyclef Jean'},
    {name: 'Yelawolf'},
    {name: 'YG'},
    {name: 'Yo Gotti'},
    {name: 'Young Dolph'},
    {name: 'Young Dro'},
    {name: 'Young Jeezy'},
    {name: 'Young Money'},
    {name: 'Young Scooter'},
    {name: 'Young Thug'}
  ];

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

    findSimilarByComplex(self.all[index]);

  }

  function findSimilarByComplex(currentCover) {

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
