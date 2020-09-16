//requires Post Schema
const Post = require("../models/post.js");

//exports getposts function
exports.getPosts = function(req, res){
    //finds post from database
    const posts = Post.find().select("_id title body")
        .then(posts => {
            //returns posts found in json
            res.json({ posts });
        })
};
//exports createpost function
exports.createPost = function(req, res){
    //creates new post and saves it as post variable
    const post = new Post(req.body);
    //saves post into database
    post.save(function(err, savedPost){
            res.json({
                //sends post back in json
                post: savedPost
            })
    });
};
