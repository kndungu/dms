module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    mochacli: {
      options: {
        env: {
          DATABASE_URI: 'mongodb://localhost:27017/testdb',
          PORT: 8080,
          SECRET_KEY: 'thisIsMySecretCanYouKeepIt?'
        }
      },
      all: ['test/*.js']
    }

  });

  // Load npm tasks
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-cli');

  // Register the tasks
  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('test', ['mochacli']);

};
