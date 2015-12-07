var app = angular.module('mixtapeApp', ['ui.router'])
    .config(MainRouter);

function MainRouter ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'covers': {
          templateUrl: 'home.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}
