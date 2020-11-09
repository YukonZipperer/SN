//requires Post Schema
const Post = require("../models/post.js");
const formidable = require("formidable");
const fileSystem = require("fs");
//exports getposts function
exports.getPosts = function(req, res){
    //finds post from database
    const posts = Post.find()
    .populate("author", "_id name")
    .select("_id title body")
        .then(posts => {
            //returns posts found in json
            res.json({ posts });
        })
};
//exports createpost function
exports.createPost = function(req, res){
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log("FORM Parse error");
            return res.status(400).json({
                err: "Image could not be uploaded"
            })
        }
        let post = new Post(fields);
        req.profile.hash_pass = undefined;
        req.profile.salt = undefined;
        post.author = req.profile;
        if(files.photo){
            post.photo.data = fileSystem.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save(function(err, comp){
            if(err){
                return res.status(400).json({
                    err: err
                })
            }
            res.json(comp)
        });
    });
};

exports.postsById = function(req, res){
    Post.find({author: req.profile._id})
    .populate("author", "_id name")
    .sort("_created")
    .exec(function(err, posts){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json(posts);
    });
};
