//requires express package
const express = require("express");
//configures express router
const router = express.Router();

//requires exported functions from authentication controller
const {requireSignin} = require("../ctrls/authen.js");
//requires post controller from post controller
const postCtrl = require("../ctrls/posts.js");
//requires exported functions from validators
const {postValidator} = require('../validators/index.js');

//get posts route, requires you to be signed in
router.get("/", requireSignin, postCtrl.getPosts);
//post route for creating new posts
router.post("/post", postValidator, postCtrl.createPost);
//exports router
module.exports = router;
