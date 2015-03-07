var appController = angular.module('rikeFrontAppGalleryController', ['ngAnimate', 'ngTouch'])

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

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.pictures.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.pictures.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

}]);