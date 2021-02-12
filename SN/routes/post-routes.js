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

const {findId} = require("../ctrls/user.js");
//get posts route, requires you to be signed in
router.get("/posts", postCtrl.getPosts);
//post route for creating new posts
router.post("/post/new/:userid", requireSignin, postCtrl.createPost, postValidator);
router.get("/posts/get/:userid", postCtrl.postsByUser);

router.delete("/post/:postid", requireSignin, postCtrl.isAuthor, postCtrl.deletePost);
router.put("/post/:postid", requireSignin, postCtrl.isAuthor, postCtrl.updatePost);

router.param("userid", findId)
router.param("postid", postCtrl.postById)

//exports router
module.exports = router;
