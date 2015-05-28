module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*
    concat: {
      front: {
        files: [
          // concat front controllers + app
          {src: ['front_client/js/controllers/*.js', 'front_client/js/app.js', 'admin_client/js/services.js'], dest: 'front_client/js/rikeapp.min.js'},
        ],
      },
    },
    */

    uglify: {
      front: {
        files: [
          {src: ['front_client/js/ap.fotoramajs', 'front_client/js/controllers/*.js', 'front_client/js/app.js', 'admin_client/js/services.js'], dest: 'front_client/js/rikeapp.min.js'},
        ],
      },
      admin: {
        files: [
          {src: ['front_client/js/controllers/*.js', 'front_client/js/app.js', 'admin_client/js/services.js'], dest: 'front_client/js/rikeapp.min.js'},
        ],
      },
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      front: {
        files: [
          {src: ['front_client/css/*.css'], dest: 'front_client/css/rikeapp.min.css'},
        ],
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};