'use strict';
let jwt = require('koa-jwt');
const secret = require('../config').secret;
let chalk = require('chalk');

// catch authorization failure and custom 401 handling to hide koa-jwt
// errors from users: instantly moves on to the next middleware and handles
// eventually thrown errors.
function* authHandler(next) {
  try {
    yield next; // -> jwt authorization
  } catch (err) {
    if (err.status === 401) {
      this.status = 401; // authentication is possible but has failed
      this.body = 'Failure. Protected resource. No Authorization header found.\n';
      console.warn(JSON.stringify({type: 'auth', message: 'Failure: No authentication header found.', details: this.headers, date: new Date()}));
    }
    else {
      throw err;
    }
  }
}

function* auth(next) {
  if (process.env.NOAUTH) {
    console.warn(chalk.bgRed.bold.white(' DISABLED AUTHENTICATION '));
    yield next;
  } else {

    yield authHandler.call(this, jwt({secret: secret}).call(this, next));

    if (this.hasOwnProperty('state') && this.state.hasOwnProperty('user')) {
      var ip = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress || this.req.socket.remoteAddress || this.req.connection.socket.remoteAddress;
      yield this.pg.db.client.query_(
        'INSERT INTO activity (user_id, url, method, status_code, ip, user_agent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [this.state.user.id, this.request.url, this.request.method, this.res.statusCode, ip, this.request.headers['user-agent']]);
    }

    yield next;
  }
}

module.exports = auth;
