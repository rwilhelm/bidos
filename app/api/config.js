'use strict';

function getConfig() {
  const env = {
    production: {
      port: 3000,
      host: 'bidos.uni-koblenz.de',
      secret: 'ahciexef6xooDi9Qua8kaimah0de5oeyei0hooph6oosah7thiesh2ki0zie7kee',
      db: 'postgres://bidos:bidos@localhost/bidos_production'
    },
    development: {
      port: 3010,
      host: 'bidos.uni-koblenz.de',
      secret: 'tea1Ba8ed0tooyiquoWoomeej6eexeeyohmeo5Chie0eesohroo9iyooquuohoso',
      db: 'postgres://bidos:bidos@localhost/bidos_development'
    },
    localdev: {
      port: 3010,
      host: '192.168.43.91', // 192.168.43.91 172.20.10.2
      secret: 'tea1Ba8ed0tooyiquoWoomeej6eexeeyohmeo5Chie0eesohroo9iyooquuohoso',
      db: 'postgres://bidos:bidos@localhost/bidos_development'
    },
    test: {
      port: 3020,
      host: 'bidos.uni-koblenz.de',
      secret: 'dae3wai8AhcaeCh5ahXaib5bahfapeehoh3moo7Ohng9rei0chai0exie0phe7Oo',
      db: 'postgres://bidos:bidos@localhost/bidos_test'
    }
  };

  let config = env[process.env.NODE_ENV];

  config.version = function () { return require('../../package.json').version; };
  config.name = 'bidos';
  config.url = 'http://' + config.host + ':' + config.port;
  config.api = config.url + '/v1';
  config.crud = config.url + '/v1/crud';
  config.resources = config.api + '/resources/vanilla';
  config.anonResources = config.api + '/resources/anon';
  config.token_key = 'auth_token';
  config.sendgrid = {
    user: config.name,
    key: 'COEvNvaCcIkgOdDELr5gS'
  };

  return config;
}

module.exports = exports = getConfig(); // oO
