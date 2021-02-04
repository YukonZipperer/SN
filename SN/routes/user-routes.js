//requires express package
const express = require("express");
//configures express router
const router = express.Router();
//requires the requireSignin function from authen.js
const {requireSignin} = require("../ctrls/authen.js");

//requires methods from the user.js controller
const {findId, getUser, all, profileUpdate, deleteProfile, getProfileImage} = require("../ctrls/user.js");
//routes to access methods for user
router.get("/users", all);
router.get("/user/:userid", requireSignin, getUser);
router.put("/user/:userid", requireSignin, profileUpdate);
router.delete("/user/:userid", requireSignin, deleteProfile);
router.get("/user/photo/:userid", getProfileImage);
//whenever the variable 'userid' is in the request, it will find the user
router.param("userid", findId);


//exports express router
module.exports = router;
