// Category
angular.module('rikeAppCategoryController', ['rikeAppService', 'ngAnimate', 'mgcrea.ngStrap'])

.controller('CategoryCtrl', ['$scope', '$resource', 'CategoryService',
  function($scope, $resource, CategoryService) {
    
    $scope.categories = [];

    CategoryService.get( function (result) {
      $scope.categories = result;
    });

    $scope.popover = {};

    $scope.addCategory = function (cat) {
      CategoryService.add(cat, function(result) {
        if (result.tooManyCatsMessage) {
          $scope.popover = {
            "title": "Achtung",
            "content": "Maximal 8 Kategorien"
          };
        } else {
          $scope.categories.push(result);
          $scope.cat = '';
          delete $scope.popover;
        }
      });
    };

    var DelCategory = $resource('/api/cat/:id');
    $scope.delCategory = function (cat) {
      var category = new DelCategory( { "_id" : cat._id });
      category.$remove( {id : cat._id}, function (err, result) {
        var index = $scope.categories.indexOf(cat);
        if (index > -1) {
          CategoryService.remove(cat);
          $scope.categories.splice(index, 1);
        }
      });
    };
}]);