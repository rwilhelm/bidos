//jshint esnext:true
(function() {
	'use strict';

  // see ./config/index.js
  var config = require('./config')[process.env.NODE_ENV];

  // node core
  var path = require('path');

  // utilities
  var lodash = require('lodash');

  // koa itself
  var app = require('koa')();

  // authentication
  var jwt = require('koa-jwt');

  // miscellaneous middleware
  var mount = require('koa-mount'),
      serve = require('koa-static'),
      views = require('koa-views');

  app.use(require('koa-logger')());
  app.use(require('koa-bodyparser')());
  app.use(require('koa-compress')());

  // plain html files are rendered from ./views
  app.use(views('views', {
    default: 'html',
    cache: false
  }));

  // initialize routes
  var routes = require('./config/routes');

  // serve static dirs
  app.use(mount('/', serve(path.join(__dirname, 'public'))));
  app.use(mount('/lib', serve(path.join(__dirname, 'bower_components'))));

  // mount public routes
  app.use(mount('/', routes.public.auth.middleware()));
  app.use(mount('/', routes.public.home.middleware()));

  // custom 401 handling to hide koa-jwt errors from users: instantly moves on
  // to the next middleware and returns here, if that fails.
  app.use(function *(next) {
    try {
      yield next; // -> jwt authorization
    } catch (err) {
      if (401 == err.status) {
        this.status = 401; // authentication is possible but has failed
        this.body = 'Error: Protected resource. No Authorization header found.\n';
        console.log('user is not authenticated');
      } else {
        throw err;
      }
    }
  });

  // routes below the next loc are only accessible to authenticated clients.
  // if the authorization succeeds, next is yielded and the following routes
  // are reached. if it fails, it throws and the previous middleware will
  // catch that error and send back status 401 and redirect to /login.
  app.use(jwt({ secret: config.session.secret }));

  app.use(function *(next) {
    console.log('valid token received: user is authenticated');
    yield next;
  });

  // secured routes
  app.use(mount('/v1', routes.api.users.middleware()));

  // main
  var listen = function(port) {
    console.log('api accessible on port ' + (config.app.port));
    app.listen(config.app.port);
  };

  /*jshint -W030 */
  require.main === module ? listen() : module.exports = exports = listen;
}());
