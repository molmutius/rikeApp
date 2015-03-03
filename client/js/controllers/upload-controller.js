// Upload
angular.module('rikeAppUploadController', ['rikeAppService'])

.controller('UploadCtrl', ['$scope', '$upload', '$resource', 'FileService', 'CategoryService',
  function ($scope, $upload, $resource, FileService, CategoryService) {

  var categories = [];
  CategoryService.get(function (result) {
    categories = result;
    $scope.categoryOptions = [{ name: '0', value: '' }];
    for (var i = 0; i < categories.length; i++) {
      $scope.categoryOptions.push({ name: (i + 1), value: categories[i].value});
    }
    $scope.category = $scope.categoryOptions[0];
  });

  $scope.$watch('files', function () {
    $scope.upload($scope.files);
  });

  $scope.pics = FileService.get();

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

  $scope.delPicture = function (pic) {
    console.log(pic);
    FileService.remove(pic.filename)
    FileService.delete(pic.filename);
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