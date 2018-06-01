var user = require('../Models/server.model.user');

module.exports.addUser = function(username, password, callback){
    user.insertMany({
        username : username,
        password : password
        },callback
    );
};

module.exports.findUser = function(username, callback){
    user.findOne({
        username : username
        },callback
    );
};

