const BearerStrategy = require('passport-http-bearer').Strategy

const passport = require('passport');
const moment = require('moment')

var tokenDb = require('../Db/Token');
var User = require('../Models/server.model.user');

var Token = require('../Models/server.model.token');

passport.use('bearer',new BearerStrategy(
    function(token, done) {
      Token.findOne({accessToken:token}, function (err, result) {
        if (err) { return done(err); }
        if (!result) { return done(null, false); }
        if(result.expirationDate < moment().toDate().getTime()){
          tokenDb.deleteToken(result.username, done);
          return done(null, false);
        }
        return done(null, result);
      });
    }
  ));