//requires lodash package
const _ = require("lodash");
//requires User from user.js
const User = require("../models/user.js");
//method to find a user by id
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
//method to get profile information about user
exports.getUser = function(req, res){
    req.profile.hash_pass = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

//checks to make sure you are authorized to view profile
exports.isAuth = function(req, res, next){
    const author = req.profile && req.auth && req.profile._id == req.auth._id
    if(!author){
        return res.status(403).json({
            err: "User is not authorized"
        });
    }
}
//method to update profile
exports.profileUpdate = function(req, res, next) {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save(function(err){
        if(err){
            return res.status(400).json({
                err: "You are not authorized"
            });
        }

        user.hash_pass = undefined;
        user.salt = undefined;
        res.json({user});
    });
}
//method to delete profile
exports.deleteProfile = function(req, res, next){
    let user = req.profile;
    user.remove(function(err, user){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json({
            msg: "Account successfully deleted"
        });
    });
}
//method to find all profiles
exports.all = function(req, res){
    User.find(function(err, userf){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json(userf)
    }).select("name email updated created");
}

