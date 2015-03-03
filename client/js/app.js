// dependencies
var rikeApp = angular.module('rikeApp', [
	'ngResource',
	'ngRoute',
	'ngAnimate',
	'angularFileUpload',
	'rikeAppService',
	'rikeAppHomeController',
	'rikeAppPictureController',
	'rikeAppUploadController',
	'rikeAppCategoryController',
]);

// routes
rikeApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/partials/home-partial',
				controller: 'HomeCtrl'
			}).
			when('/pictures', {
				templateUrl: 'views/partials/pictures-partial',
				controller: 'PictureCtrl'
			}).
			when('/upload', {
				templateUrl: 'views/partials/upload-partial',
				controller: 'UploadCtrl'
			}).
			when('/category', {
				templateUrl: 'views/partials/category-partial',
				controller: 'CategoryCtrl'
			});
}]);
