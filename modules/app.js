// Declare variable for main angular controller
var uas2018 = angular.module('uas2018', []);

uas2018.controller('uas2018_controller', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
  // Condition for preventing the header and footer from rendering in login page
  if ($location.path() == '/login') {
    $scope.x = false;
  } else {
    $scope.x = true;
  }

}]);

// Declare authentication and home modules
angular.module('Authentication', []);
angular.module('Home', []);

// Load angular modules
angular.module('UAS_2018', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies',
    'uas2018'
  ])

  // Define URL path extensions
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: './assets/views/login.html'
      })
      .when('/', {
        templateUrl: './assets/views/home.html'
      })
      .when('/processing', {
        controller: 'uas2018_process_controller',
        templateUrl: './processing/processing.html'
      })
      .when('/map', {
        controller: 'uas2018_map_controller',
        templateUrl: './2d_map/map_2d.html'
      })
      .when('/3D', {
        controller: 'HomeController',
        templateUrl: './assets/views/map_3d.html'
      })
      .when('/sensor', {
        controller: 'sensor_controller',
        templateUrl: './assets/views/sensor.html'
      })
      .when('/about_us', {
        controller: 'HomeController',
        templateUrl: './assets/views/about_us.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  // Check if user credentials are stored in cookie,
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function($rootScope, $location, $cookieStore, $http) {

      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function(event, next, current) {

        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    }
  ]);
