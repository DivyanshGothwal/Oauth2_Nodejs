const oauth2orize = require('oauth2orize');
const passport = require('passport');
const moment = require('moment');
var User = require('../Models/server.model.user');
const uuidv1 = require('uuid/v1');
var tokenDb = require('../Db/Token');


var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done)=>{
    User.findOne({username:username},function(err, res){
        if(err) return done(err);
        if(!res) return done(null,false);
        if(res.password === password){
            const accessToken = uuidv1();
            const refreshToken = uuidv1();
            const sessionId = uuidv1();
            const expirationDate = moment().add(10, 'minutes').format();

            tokenDb.deleteToken(username,done);

            tokenDb.insertToken(username, accessToken, refreshToken, expirationDate, sessionId, done);

            return done(null,accessToken,refreshToken,{expiresin:expirationDate});
        }
        else{
            var err = new oauth2orize.TokenError(
                'Provided credentials are not correct',
                'invalid credentials'
              );
              
              return done(err);
            //done(null, false, {info : "invalid credentials"});
        }
    })
}))


server.exchange(oauth2orize.exchange.refreshToken((client,refreshToken, done)=>{
    tokenDb.myFindOne(refreshToken, function(err, res){
        if(err) done(err);
        if(!res) done(null, false);

        const newAccessToken = uuidv1();
        const newRefreshToken = uuidv1();
        const newSessionId = uuidv1();  
        const newExpirationDate = moment().add(10, 'minutes').format();
        
        tokenDb.updateToken(newAccessToken, newRefreshToken, newExpirationDate,newSessionId, res.sessionId);
        done(null, newAccessToken, newRefreshToken, {expiresIn:newExpirationDate });
    });

}));


module.exports.authenticate = server;