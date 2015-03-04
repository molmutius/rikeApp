var appController = angular.module('rikeAppHomeController', [])

// Nav-Header
appController.controller('MainController', ['$scope', '$location', 
  function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.css = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css';
    $scope.bootstraps = [
      { name: 'Basic', url: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css' },
      { name: 'Cosmo', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/cosmo/bootstrap.min.css' },
      { name: 'Flatly', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/flatly/bootstrap.min.css' },
      { name: 'Journal', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/journal/bootstrap.min.css' },
      { name: 'Paper', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/paper/bootstrap.min.css' },
      { name: 'Yeti', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/yeti/bootstrap.min.css' }
    ];
  }]);

// Landing-Page
appController.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.name = 'Rike';
}]);