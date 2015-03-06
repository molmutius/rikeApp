var appController = angular.module('rikeFrontAppGalleryController', [])

// Nav-Header
appController.controller('GalleryCtrl', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {

    $scope.loader = {
       loading : true,
    };

    $scope.pictures = [];

    var Picture = $resource('/api/pics/' + $routeParams.category);

    Picture.query(function (results) {
      $scope.pictures = results;
      $scope.loader.loading = false;
    });

}]);