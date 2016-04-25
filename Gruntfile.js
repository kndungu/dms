module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'app.js'
      }
    }

  });

  // Load nodemon
  grunt.loadNpmTasks('grunt-nodemon');

  // Register the nodemon task when grunt is run
  grunt.registerTask('default', ['nodemon']);

};
