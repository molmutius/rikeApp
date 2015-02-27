'use strict';

var appController = angular.module('rikeAppController', ['rikeAppService']);

// Nav-Header
appController.controller('MainController', ['$scope', '$location', 
  function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.css = '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/paper/bootstrap.min.css';
    $scope.bootstraps = [
      { name: 'Basic', url: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css' },
      { name: 'Cosmo', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/cosmo/bootstrap.min.css' },
      { name: 'Flatly', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/flatly/bootstrap.min.css' },
      { name: 'Journal', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/journal/bootstrap.min.css' },
      { name: 'Paper', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/paper/bootstrap.min.css' },
      { name: 'Yeti', url: '//maxcdn.bootstrapcdn.com/bootswatch/3.3.2/yeti/bootstrap.min.css' }
    ];
  }]);

// Landing-Page
appController.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.text = 'Erich';
}]);

// Category
appController.controller('CategoryCtrl', ['$scope', '$resource',
  function($scope, $resource) {
    
    var Category = $resource('/api/category');

    $scope.categories = [];
}]);

// Pictures
appController.controller('PictureCtrl', ['$scope', '$resource',
  function($scope, $resource) {

    var Picture = $resource('/api/pics');

    Picture.query(function (results) {
      $scope.pictures = results;
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

// Upload
appController.controller('UploadCtrl', ['$scope', '$upload', '$resource', 'FileService',
  function ($scope, $upload, $resource, FileService) {

  $scope.$watch('files', function () {
        $scope.upload($scope.files);
  });

  $scope.pics = FileService.get();

  $scope.categoryOptions = [
    { name: '0', value: '' },
    { name: '1', value: 'Space' },
    { name: '2', value: 'Landschaft' },
  ];

  $scope.category = $scope.categoryOptions[0];

  $scope.upload = function (files) {
      if (files && files.length) {

          $scope.loader = {
             loading : false,
             progress : 0,
          };

          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              $scope.loader.loading = true;
              $upload.upload({
                  url: '/api/pics/upload',
                  fields: {
                      'category': $scope.category.value
                  },
                  file: file
              }).progress(function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  $scope.loader.progress = progressPercentage;
              }).success(function (data, status, headers, config) {
                  //console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
                  var filename = data.file[0].path.replace(/\\/g,"/");
                  filename = filename.split("/");
                  filename = filename[filename.length - 1]
                  FileService.add(filename, '', $scope.category.value);
                  $scope.loader.loading = false;
              });
          }
      }
  };
  
  var Picture = $resource('/api/pics');
  $scope.addPictures = function () {
    for (var i = 0; i < $scope.pics.length; i++) {
      var picture = new Picture();
      picture.caption = $scope.pics[i].caption;
      picture.url = $scope.pics[i].filename;
      picture.category = $scope.pics[i].category;
      picture.$save(function (result) {
        FileService.remove(picture.url)
      });
    }
  };

  $scope.addPicture = function (pic) {
      var picture = new Picture();
      picture.caption = pic.caption;
      picture.url = pic.filename;
      picture.category = pic.category;
      picture.$save(function (result) {
        FileService.remove(picture.url)
      });
  };

}]);