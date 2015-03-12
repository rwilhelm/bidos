(function() {
  'use strict';

  const CONFIG = {

    production: {
      app: {
        name: process.env.NAME || 'bidos',
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'production',
        url: process.env.API_URL || 'http://92.51.147.239:3000'
      },
      db: {
        postgres: {
          url: process.env.DB_URL || 'postgres://asdf:asdf@localhost/bidos_production'
        }
      },
      secret: {
        key: process.env.SECRET_KEY || 'aboh3Eixo6eep5bed6ifuo8Ahm9IesohVaesoh1ahch7kohHu2upoethahT8auC0' // jwt secret
      },
      sendgrid: {
        key: process.env.SENDGRID_KEY || 'COEvNvaCcIkgOdDELr5gS' // sendgrid api key
      }
    },

    development: {
      app: {
        name: process.env.NAME || 'bidos',
        port: process.env.PORT || 3002,
        env: process.env.NODE_ENV || 'development',
        url: process.env.API_URL || 'http://localhost:3002'
      },
      db: {
        postgres: {
          url: process.env.DB_URL || 'postgres://asdf:asdf@localhost/bidos_development'
        }
      },
      secret: {
        key: process.env.SECRET_KEY || 'quaiQu8Aejee8MaikohdooSasohhiechieQu0idohthoo8Theesaepu6Tuc2yeed' // jwt secret
      },
      sendgrid: {
        key: process.env.SENDGRID_KEY || 'COEvNvaCcIkgOdDELr5gS' // sendgrid api key
      }
    },

    test: {
      app: {
        port: process.env.PORT || 3004,
        env: process.env.NODE_ENV || 'test'
      },
      db: {
        postgres: {
          url: process.env.DB_URL || 'postgres://asdf:asdf@localhost/bidos_test'
        }
      },
      secret: {
        key: process.env.SECRET_KEY || 'aihoobaje0keichu2aePu2aighixawefaim7ule7aeme4aiGh2gei4ku3uabiexe' // jwt secret
      }
    }
  };

  module.exports = exports = CONFIG[process.env.NODE_ENV];

}());
