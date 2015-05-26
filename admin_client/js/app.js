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
	'rikeAppSubcategoryController'
]);

// routes
rikeApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/partials/home-partial',
			}).
			when('/pictures', {
				templateUrl: 'views/partials/pictures-partial',
			}).
			when('/upload', {
				templateUrl: 'views/partials/upload-partial',
			}).
			when('/category', {
				templateUrl: 'views/partials/category-partial',
			}).
			when('/category/:sub', {
				templateUrl: 'views/partials/subcategory-partial',
			}).
			otherwise({ 
				reditrectTo : "/" 
			});
}]);
