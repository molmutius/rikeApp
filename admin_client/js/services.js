var appService = angular.module('rikeAppService', []);

appService.service('FileService', ['$resource',
 function($resource) {
	var files = [];

	function FileObject (_filename, _caption, _category, _subcategory) {
		this.filename = _filename;
		this.caption = _caption;
		this.category = _category;
		this.subcategory = _subcategory;
	};

	function objectFindByKey(array, key, value) {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i][key] === value) {
	            return i;
	        }
	    }
	    return -1;
	};

	return {
		get: function () {
			return files;
		},
		add: function (_file, _caption, _category, _subcategory) {		
			files.push(new FileObject(_file, _caption, _category, _subcategory));
		},
		remove: function (_file) {
			var index = objectFindByKey(files, 'filename', _file);
			if (index > -1) {
				files.splice(index, 1);
			}	
		},
		delete: function (_filename) {
			var DelPicture = $resource('/api/pics/unlink/:filename');
			var picture = new DelPicture({ "filename" : _filename });
			picture.$remove( {filename: _filename}, function (err, result) {
				if (err) console.log(err);
			})
		},
	};
}]);

appService.factory('CategoryService', ['$resource', 
 function($resource) {

	var Category = $resource('/api/cat');
 	var cats = [];

	return {
		get: function (callback) {
			Category.query().$promise.then(function (results) {
				cats = results;
				callback(cats);	
			});
		},
		add: function (_name, callback) {
			var category = new Category();
			category.value = _name;
			category.$save(function (result) {
				callback(result);
			});
		},
		remove: function (_cat) {
			var DelCategory = $resource('/api/cat/:id');
			var category = new DelCategory( { "_id" : _cat._id });
			category.$remove( {id : _cat._id}, function (err, result) {
				if (err) console.log(err);
		    });
		},
	};
}]);

appService.service('SubcategoryService', ['$resource',
 function($resource) {

	return {
		get: function (ubercat, callback) {
			if (typeof ubercat !== 'undefined') {
				Subcategory = $resource('/api/cat/subs/' + ubercat);
				if (typeof ubercat.value !== 'undefined') {
					Subcategory = $resource('/api/cat/subs/' + ubercat.value);
				}	
			}
			Subcategory.query().$promise.then(function (results) {
				callback(results);	
			});
		},
		add: function (_name, ubercategory, callback) {
			var Category = $resource('/api/cat/subs');
			var subcategory = new Category();
			subcategory.name = _name;
			subcategory.ubercategory = ubercategory;
			subcategory.preview = "";
			subcategory.$save(function (result) {
				callback(result);
			});
		},
		setPreviewPicture: function (subcategory, ubercategory, previewPicture) {
			var Subcategory = $resource('/api/cat/sub/' + subcategory);
			var sub = Subcategory.get({ }, function () {
				console.log(sub);
				sub.preview = previewPicture;
				sub.$save();
			});
		},
		remove: function (_cat) {
			var DelCategory = $resource('/api/cat/subs/:id');
			var category = new DelCategory( { "_id" : _cat._id });
			category.$remove( {id : _cat._id}, function (err, result) {
				if (err) console.log(err);
		    });
		},
	};
}]);