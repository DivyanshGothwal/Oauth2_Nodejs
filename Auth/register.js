

var userDb = require('../Db/user');
module.exports.register = function(req, res, next){
    userDb.findUser(req.body.username,(err, result)=>{
        if(err) { 
            res.status(400).json(err.toString());
        }
        else{
            if(result) { 
                res.status(400).json("username already taken");
            }
            else{
                userDb.addUser(req.body.username, req.body.password, (err,results)=>{
                    if(err) { 
                        res.status(400).json(err.toString());
                    }
                    else{
                        res.json( "user registered successfully");                        
                    }
                });
            }
        }
        
    });
};