app.controller('MixtapeCtrl', ['$log', '$http', MixtapeCtrl]);

function MixtapeCtrl($log, $http) {

  var self = this;
  self.title = "Banger Gallery";
  self.all = [];

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

}
