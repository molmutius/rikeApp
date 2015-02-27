var appService = angular.module('rikeAppService', []);

appService.service('FileService', function() {
	var files = [];

	function FileObject (_filename, _caption, _category) {
		this.filename = _filename;
		this.caption = _caption;
		this.category = _category;
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
		add: function (_file, _caption, _category) {		
			files.push(new FileObject(_file, _caption, _category));
		},
		remove: function (_file) {	
			var index = objectFindByKey(files, 'filename', _file);
			if (index > -1) {
				files.splice(index, 1);
			}	
		},
	};
});