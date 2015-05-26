// dependencies
var rikeFrontApp = angular.module('rikeFrontApp', [
	'ngResource',
	'ngRoute',
	'ngAnimate',
	'ap.fotorama',
	'rikeAppService',
	'rikeFrontAppHomeController',
	'rikeFrontAppGalleryController',
	'rikeFrontAppSubcategoryController',
]);

// routes
rikeFrontApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/partials/home-partial',
				controller: 'HomeCtrl'
			}).
			when('/:category', {
				templateUrl: 'views/partials/subcategory-partial',
			}).
			when('/pics/:category/:sub', {
				templateUrl: 'views/partials/gallery-partial',
			}).
			otherwise({ 
				reditrectTo : "/" 
			});
}]);