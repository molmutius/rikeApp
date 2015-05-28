var appController = angular.module('rikeFrontAppHomeController', ['rikeAppService'])

// Nav-Header
appController.controller('MainCtrl', ['$scope', '$location', '$resource', 'CategoryService',
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