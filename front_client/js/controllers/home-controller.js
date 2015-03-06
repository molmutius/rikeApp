var appController = angular.module('rikeFrontAppHomeController', ['rikeAppService'])

// Nav-Header
appController.controller('CssController', ['$scope', '$location', 
  function($scope, $location) {
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

appController.controller('LinkController', ['$scope', '$location', '$resource', 'CategoryService',
  function($scope, $location, $resource, CategoryService) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.loader = {
       loading : true,
    };

    $scope.categories = [];
    CategoryService.get( function (result) {
      $scope.categories = result;
      $scope.loader.loading = false;
    });

  }]);

// Landing-Page
appController.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.name = 'Rike';
}]);