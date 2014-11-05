(function() {
  'use strict';

  // https://github.com/sequelize/sequelize/wiki/API-Reference-Sequelize

  var db = require('./models');

  var sync = function() {
    db.sequelize.sync().complete(function(err) {
       if (!!err) {
         console.log('An error occurred while creating the table:', err);
       } else {
        console.log('Database schemes synchronized.');
       }
    });

  };


  // TODO return a promise here to be safe?
  module.exports = exports = db;

}());
