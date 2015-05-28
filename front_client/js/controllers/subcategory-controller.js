var appController = angular.module('rikeFrontAppSubcategoryController', ['rikeAppService'])

appController.controller('SubcategoryCtrl', ['$scope', '$location', 'SubcategoryService', '$routeParams',
  function($scope, $location, SubcategoryService, $routeParams) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.loader = {
       loading : true,
    };

    // get the subcategories
    $scope.subcategories = [];
    SubcategoryService.get($routeParams.category, function (result) {
      console.log($routeParams.category);
      $scope.subcategories = result;
      $scope.loader.loading = false;
    });

}]);
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

    $scope.css = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css';

}]);

// Landing-Page
appController.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.name = 'Rike';
}]);