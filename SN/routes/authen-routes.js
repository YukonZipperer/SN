//requires express package
const express = require("express");
//configures express router
const router = express.Router();


//imports the exported functions from authentication controller
const {signup, signin, signout} = require("../ctrls/authen.js");

const {findId} = require("../ctrls/user.js");
//imports teh exported functions from validators
const {signupValidator} = require("../validators/index.js");

//sign up route with middleware and end function
router.post("/signup", signupValidator, signup);
//sign in route
router.post("/signin", signin);
//sign out routes
router.get("/signout", signout);

router.param("userid", findId);

//exports express router
module.exports = router;
