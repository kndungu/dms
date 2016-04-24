module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: './bin/www'
      }
    }

  });

  // Load nodemon
  grunt.loadNpmTasks('grunt-nodemon');

  // Register the nodemon task when grunt is run
  grunt.registerTask('default', ['nodemon']);

};
