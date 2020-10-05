const User = require("../models/user.js");

exports.findId = function(req, res, next, id){
    User.findById(id).exec(function(err, user){
        if(err || !user){
            return res.status(400).json({
                err: "User not found"
            });
        }
        req.profile = user;
        next();
    });

}

exports.getUser = function(req, res){
    req.profile.hash_pass = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.isAuth = function(req, res, next){
    const author = req.profile && req.auth && req.profile._id === req.auth._id
    if(!author){
        return res.status(403).json({
            err: "User is not authorized"
        });
    }
}



exports.all = function(req, res){
    User.find(function(err, userf){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json({
            users: userf
        })
    }).select("name email updated created");
}

