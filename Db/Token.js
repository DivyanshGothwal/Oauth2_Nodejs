var Token = require('../Models/server.model.token');

exports.deleteToken = function(username, done){
    Token.deleteMany({ 
        username : username, 
        expirationDate : { 
            $lte: Date.now()
        }},function(err,res){
        if(err) done(err);
    });
};

exports.insertToken = function(username, accessToken, refreshToken, expirationDate, sessionId, done){
    Token.insertMany({
        username:username,
        accessToken:accessToken,
        refreshToken:refreshToken,
        sessionId:sessionId,
        expirationDate:expirationDate
    },function(err,res){
        if(err) done(err);
    });
};
exports.updateToken = function(newAccessToken, newRefreshToken, newExpirationDate, newSessionId, oldSessionId, done){
    Token.update({
        sessionId:oldSessionId
    },{
            accessToken:newAccessToken,
            refreshToken:newRefreshToken,
            sessionId:newSessionId,
            expirationDate:newExpirationDate
        },function(err,res){
        if(err) done(err);
    });
};

exports.myFindOne = function(refreshToken, callback){
    Token.findOne({
        refreshToken : refreshToken
    },callback);
}