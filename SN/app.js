//requires express package
const express = require("express");
//initializes express app
const app = express();
//requires body-parser package
const bodyParser = require("body-parser");
//sets app to use body-parser json
app.use(bodyParser.json());
//requires cookie-parser package
const cookieParser = require("cookie-parser");
//sets app to use cookie-parser
app.use(cookieParser());
//requires dotenv package
const dotenv = require("dotenv");
//configures dotenv
dotenv.config();
//requires express-validator package
const expressValidator = require("express-validator");
//sets app to use express validator package
app.use(expressValidator());

//requires mongoose package
const mongoose = require("mongoose");
//sets up connection for mongodb atlas
const connection = "mongodb+srv://U1u728:Fu279KZ@sncluster.wcmha.azure.mongodb.net/inco?retryWrites=true&w=majority";
//connects to mongodb cloud database
mongoose.connect(connection, {
  //required to run
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//prints in console that the database is connected
.then(() => console.log("Database Connected"))
//catches errors and prints them to console
.catch(error => console.log(error.message));

//imports post routes
const postRoutes = require("./routes/post-routes.js");
//imports authentication routes
const authenRoutes = require("./routes/authen-routes.js");
const userRoutes = require("./routes/user-routes.js");
//sets app to use post routes
app.use("/", postRoutes);
//sets app to use authentication routes
app.use("/", authenRoutes);
app.use("/", userRoutes);

//checks for specific error regarding getting posts while not signed in
app.use(function(err, req, res, next){
  //if specific error
    if (err.name === "UnauthorizedError"){
      //sends not authorized message in json
      res.status(401).json({error: "Not Authorized"});
    }
});




//these commands set up mongo and run localized server
//C:\mongodb\bin\mongod.exe
//C:\mongodb\bin\mongo.exe
//listening on port 8080
app.listen(8080, function(){
  //prints message when server started
    console.log("Server Started");
});
