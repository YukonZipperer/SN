//requires Post Schema
const Post = require("../models/post.js");
const formidable = require("formidable");
const fileSystem = require("fs");
const _ = require("lodash");
//exports getposts function
exports.getPosts = function(req, res){
    //finds post from database
    const posts = Post.find()
    .populate("author", "_id name")
    .select("_id title body created")
    .sort({created: -1})
        .then(posts => {
            //returns posts found in json
            res.json(posts);
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

exports.postById = function(req, res, next, id){
    Post.findById(id)
    .populate("author", "_id name")
    .select("_id title body created")
    .exec(function(err, posts){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        req.post = posts;
        next();
    });
};

exports.postsByUser = function(req, res){
    Post.find({author: req.profile._id})
    .populate("author", "_id name")
    .sort("_created")
    .select("_id title body created")
    .exec(function(err, posts){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json(posts);
    });
};

exports.isAuthor = function(req, res, next){
    console.log("in function");
    let isAuthor = req.post && req.auth && req.post.author._id == req.auth._id;
    console.log("req.post"+req.post);
    console.log("req.auth"+req.auth);
    console.log("req.post.author._id"+req.post.author._id);
    console.log("req.auth._id"+req.auth._id);
    if(!isAuthor){
        return res.status(403).json({
            err: "Not Authorized"
        });
    }
    next();
};

exports.deletePost = function(req, res){
    let post = req.post;
    post.remove(function(err, deletedPost){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json({
            msg: "Post has been deleted"
        });
    });
}

exports.updatePost = function(req, res, next){
    let post = req.post
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save(function(err){
        if(err){
            return res.status(400).json({
                err: err
            });
        }
        res.json(post);
    });
};
