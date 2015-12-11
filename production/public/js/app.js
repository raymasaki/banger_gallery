var app = angular.module('mixtapeApp', ['ui.router', 'angucomplete-alt'])
  .config(MainRouter)
  .directive('imgFadeInOnload', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attr) {
        // once the image is loaded add the class 'loaded'
        element.bind("load", function () {
          element.addClass('loaded');
        });
        element.attr('src', attr.imgFadeInOnload);
      }
    };
  });

  app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
              scope.$apply(function(){
                  scope.$eval(attrs.ngEnter);
              });

              event.preventDefault();
            }
        });
    };
  });

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
