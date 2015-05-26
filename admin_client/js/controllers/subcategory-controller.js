// Category
angular.module('rikeAppSubcategoryController', ['rikeAppService', 'ngAnimate', 'mgcrea.ngStrap'])

.controller('SubcategoryCtrl', ['$scope', '$resource', 'SubcategoryService', '$routeParams',
  function($scope, $resource, SubcategoryService, $routeParams) {
    
    $scope.ubercategory = $routeParams.sub;
    $scope.subcategories = [];

    SubcategoryService.get($scope.ubercategory, function (result) {
      $scope.subcategories = result;
    });

    $scope.popover = {};

    $scope.addCategory = function (subcat, ubercat) {
      console.log(ubercat)
      SubcategoryService.add(subcat, ubercat, function(result) {
        if (result.tooManyCatsMessage) {
          $scope.popover = {
            "title": "Achtung",
            "content": "Maximal 8 Unterkategorien"
          };
        } else {
          $scope.subcategories.push(result);
          delete $scope.popover;
        }
      });
    };

    var DelCategory = $resource('/api/cat/subs/:id');
    $scope.delCategory = function (cat) {
      var category = new DelCategory( { "_id" : cat._id });
      category.$remove( {id : cat._id}, function (err, result) {
        var index = $scope.subcategories.indexOf(cat);
        if (index > -1) {
          SubcategoryService.remove(cat);
          $scope.subcategories.splice(index, 1);
        }
      });
    };
}]);