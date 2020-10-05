//requires express package
const express = require("express");
//configures express router
const router = express.Router();

const {requireSignin} = require("../ctrls/authen.js");


const {findId, getUser, all} = require("../ctrls/user.js");

router.get("/users", all);
router.get("/user/:userid", requireSignin, getUser);

router.param("userid", findId);


//exports express router
module.exports = router;