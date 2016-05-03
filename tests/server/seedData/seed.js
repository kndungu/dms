(function() {
  'use strict';

  var seeder = require('mongoose-seeder'),
    seedData = require('./seedData.json');

  seeder.seed(seedData, function(error, dbData) {
    if (error) {
      console.log(error);
    }
  });
})();
