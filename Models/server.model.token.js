const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tokenSchema = new Schema({
    username:String,
    accessToken:String,
    refreshToken:String,
    sessionId:String,
    expirationDate:Date
});


module.exports = mongoose.model('Token', tokenSchema);