var appController = angular.module('rikeFrontAppGalleryController', ['ngAnimate', 'ngTouch', 'ap.fotorama']);

// Nav-Header
appController.controller('GalleryCtrl', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {

    $scope.loader = {
      loading : true,
    };

    $scope.options = {
      width: '100%',
      height: 400,
      loop: true,
      keyboard: true,
      nav: 'thumbs'
    }

    $scope.items = [];

    $scope.fotoramaoptions = {  
      margin: 10,
      fit: 'scaledown', 
      width: '100%', 
      maxheight: 800,
      loop: true,
      keyboard: true, 
      nav: 'thumbs', 
      transition: 'slide', 
      allowfullscreen: true, 
      spinner: {
        lines: 13,
        color: 'rgba(255, 255, 255, .75)'
      },
      thumbborderwidth: 1,
      thumbmargin: 5 
    };

    //console.log($routeParams);
    var Picture = $resource('/api/pics/' + $routeParams.category + '+' + $routeParams.sub);

    Picture.query(function (results) {
      results.forEach(function(entry, i) {
        var item = {
          id: i, 
          pos: i, 
          active: 0, 
          full: '../uploads/' + entry.url, 
          img: '../uploads/' + entry.url, 
          thumb: '../uploads/' + entry.url, 
          html: '', 
          caption: entry.caption
        };
        $scope.items.push(item);
      });
      $scope.loader.loading = false;
    });

}]);