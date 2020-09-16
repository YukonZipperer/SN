//requries user model
const User = require("../models/user.js");
//requires jsonwebtoken package
const jsonWebToken = require("jsonwebtoken");
//requires dotenv package and configures it
const dotenv = require("dotenv");
dotenv.config();
//requires express-jwt package
const expressJwt = require("express-jwt");


//exports signup function
exports.signup = async function(req, res){
    //searches for user with email already in use
    const userEx = await User.findOne({email: req.body.email});
    //if user already has email
    if(userEx){
        //sends back error message in json saying
        //that email is already in use
        res.status(403).json({
            error: "Email is already in use"
        });
    };
    //creates user variable and creates new user
    const user = new User(req.body);
    //saves new user in database
    await user.save()
    //sends back json message saying signup completed
    res.status(200).json({
        msg: "Signup Complete"
    });
}

//exports signin function
exports.signin = function(req, res){
    //extracts email and password from the request body
    const {email, password} = req.body;
    //finds user in database with email from request
    User.findOne({email}, function(err, user){
        //if there is an error or if user not found
        if(err || !user){
            //sends json saying that user entered doesn't exist
            return res.status(401).json({
                error: "User with that email does not exist. Please signup"
            });
        }
        //if the email and password don't match
        if(!user.authenticate(password)){
            //returns json saying credentials are incorrect
            return res.status(401).json({
                error: "Email or Password are incorrect"
            });
        }
        //creates tpken variable
        //signs token with user credentials
        const token = jsonWebToken.sign({_id: user._id}, process.env.jsonWebTokenS);
        //names cookie/token and sets expiration date
        res.cookie("authen-token", token, {expire: new Date() + 9999})
        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name}});

    });
};

//exports signout function
exports.signout = function(req, res){
    //clears authentication cookie
    res.clearCookie("authen-token");
    //returns json saying signout completed
    return res.json({
        msg: "Signout Complete"
    })
}

//exports require sign in middleware function
exports.requireSignin = expressJwt({
    //stuff below is needed for expressjwt package to work
    secret: process.env.jsonWebTokenS,
    algorithms: ["HS256"],
    userProperty: "auth",
});