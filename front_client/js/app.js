// dependencies
var rikeFrontApp = angular.module('rikeFrontApp', [
	'ngResource',
	'ngRoute',
	'ngAnimate',
	'ap.fotorama',
	'rikeAppService',
	'rikeFrontAppHomeController',
	'rikeFrontAppGalleryController',
]);

// routes
rikeFrontApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/partials/home-partial',
				controller: 'HomeCtrl'
			}).
			when('/pics/:category', {
				templateUrl: 'views/partials/gallery-partial',
			}).
			otherwise({ 
				reditrectTo : "/" 
			});
}]);