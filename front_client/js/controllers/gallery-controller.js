var appController = angular.module('rikeFrontAppGalleryController', ['ngAnimate', 'ngTouch'])

// Nav-Header
appController.controller('GalleryCtrl', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {

    $scope.loader = {
       loading : true,
    };

    allPictures = [];
    pageSize = 10;
    totalPages = 0;
    currentPage = 0;
    $scope.pictures = [];

    var Picture = $resource('/api/pics/' + $routeParams.category);

    Picture.query(function (results) {
      allPictures = results;
      totalPages = (allPictures.length + pageSize - 1) / pageSize;
      totalPages = Math.ceil(totalPages) - 1;
      console.log(totalPages);
      $scope.pictures = allPictures.slice(0, pageSize);
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
        // previous page
        if ((($scope._Index - 1) % pageSize ) + 1 == 0) {
            if (currentPage - 1 < 0) {
                currentPage = totalPages - 1;
                // fix for only one picture
                if (currentPage < 0) {
                  currentPage = 0;
                }
            } else {
                currentPage--;
            }
            console.log("Page " + currentPage);
            $scope.pictures = allPictures.slice(currentPage*pageSize, currentPage*pageSize + pageSize);
            $scope._Index = $scope.pictures.length - 1;
        // same page
        } else {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.pictures.length - 1;
        }
        console.log("Index " + $scope._Index);

        //$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.pictures.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        if (($scope._Index + 1) % $scope.pictures.length == 0) {
            if (currentPage + 1 >= totalPages) {
                currentPage = 0;
            } else {
                currentPage++;
            }
            console.log("Page " + currentPage);
            $scope.pictures = allPictures.slice(currentPage*pageSize, currentPage*pageSize + pageSize);
            $scope._Index = 0;
        } else {
            $scope._Index = ($scope._Index < pageSize) ? ++$scope._Index : 0;
        }
        console.log("Index " + $scope._Index);
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

    // navigate via keyboard shortkey
    $scope.keyControl = function($event) {
      if ($event.which == 37) {
          $scope.showPrev();
      }
      if ($event.which == 39) {
          $scope.showNext();
      }
    };

}]);