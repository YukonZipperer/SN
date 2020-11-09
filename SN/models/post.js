//requires mongoose
const mongoose = require("mongoose");
//creates post schema
const {ObjectId} = mongoose.Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
})
//exports post schema as PostSchema
module.exports = mongoose.model("PostSchema", postSchema);
