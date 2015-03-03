// Pictures
angular.module('rikeAppPictureController', ['rikeAppService']).controller('PictureCtrl', ['$scope', '$resource',
  function($scope, $resource) {

    $scope.loader = {
       loading : true,
    };

    var Picture = $resource('/api/pics');

    Picture.query(function (results) {
      $scope.pictures = results;
      $scope.loader.loading = false;
    });

    $scope.pictures = [];

    var DelPicture = $resource('/api/pics/:id');

    $scope.delPicture = function (pic) {
      var picture = new DelPicture( { "_id" : pic._id });
      picture.$remove({ id : pic._id }, function (err, result) {
        var index = $scope.pictures.indexOf(pic);
        if (index > -1) {
          $scope.pictures.splice(index, 1);
        }        
      });
    }

    $scope.delAllPictures = function () {
      for (var i = 0; i < $scope.pictures.length; i++) {
        var pic = $scope.pictures[i];
        var picture = new DelPicture( { "_id" : pic._id });
        picture.$remove({ id : pic._id }, function (err, result) {
          if (err) console.log(err);
        });
      }
      $scope.pictures = [];
    }
}]);
