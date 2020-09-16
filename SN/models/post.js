//requires mongoose
const mongoose = require("mongoose");
//creates post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
})
//exports post schema as PostSchema
module.exports = mongoose.model("PostSchema", postSchema);
