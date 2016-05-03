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
          PORT: 3000,
          SECRET_KEY: 'testSecretKey'
        },
        // Drop db and insert seed data before running the tests
        require: ['./app', './tests/server/seedData/seed']
      },
      all: ['tests/server/*.spec.js']
    }

  });

  // Load npm tasks
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-cli');

  // Register the tasks
  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('test', ['mochacli']);

};
