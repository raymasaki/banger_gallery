var app = angular.module('mixtapeApp', ['ui.router'])
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('detail', {
      url: '/detail/:id',
      templateUrl: 'detail.html'
    });

  $urlRouterProvider.otherwise('/');
}
