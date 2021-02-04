//requires mongoose package
const mongoose = require("mongoose");
//requires crypto package for hashing
const crypto = require("crypto");
//requires uuidv1 package for salt
let uuid1 = require('uuidv1')

//creates user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    //stores password as hashed password and not plain text
    hash_pass: {
        type: String,
        required: true,
    },
    //salt
    salt: String,
    //date it was created
    created: {
        type: Date,
        default: Date.now(),
    },
    //date it was updated
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    }
})
//methods for user schema
userSchema.methods = {
    //authentication method for signing in
    authenticate: function(plainT){
        //takes in plain text password and checks to see
        //if it matches the stored hashed password in db
        return this.encryptPassword(plainT) === this.hash_pass;
    },
    //encrypt password method
    encryptPassword: function(password){
        //if there is no password
        if (!password){
            //returns empty string
            return "";
        //if there is password
        } else{
            //returns encrypted password using sha1
            return crypto.createHmac("sha1", this.salt)
                                .update(password)
                                .digest("hex");
        }
    }
}

//hashes password
//does salt stuff
userSchema.virtual("password")
.set(function(password){
    this._password = password;

    this.salt = uuid1();

    this.hash_pass = this.encryptPassword(password);
})
.get(function(){
    return this._password;
})
//exports user model as User
module.exports = mongoose.model("User", userSchema);

