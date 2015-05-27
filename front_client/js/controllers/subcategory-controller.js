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