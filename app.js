const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const register = require("./Auth/register").register;
const auth = require("./Auth/authenticate");
const server = require("./Auth/authorization").authenticate;
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost:27017/libraryApp');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send("hello");
})

app.post("/token", server.token(), server.errorHandler());

app.post('/register', register);


app.get('/userInfo', passport.authenticate('bearer', { session: false }), function (req, res) {
     res.send((req.user.username) + " successfully loged in");
 })


app.listen(4000, (err,res) =>{
    if(err) console.log(err);
    console.log("Running on port 4000");
})