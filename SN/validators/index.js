//exports post validator
exports.postValidator = function(req, res, next) {
    //checks that post title is not empty
    req.check("title", "Title is Required").notEmpty();
    //checks that post title is between 2 and 100 characters
    req.check("title", "Title must be between 2 and 100 characters long").isLength({
        min: 2, max: 100,
    });
    //checks that post body is not empty
    req.check("body", "Body is Required").notEmpty();
    //checks that post body is between 10 and 5000 characters
    req.check("body", "Body must be between 10 and 5000 characters long").isLength({
        min: 10, max: 5000,
    });
    //gathers errors in err variable
    const errs = req.validationErrors();
    //if errors
    if(errs){
        //returns first error in json format
        const error1 = errs.map(error => error.msg)[0];
        return res.status(400).json({error: error1});
    }
    //moves to next process
    next();
};
//exports signup validator
exports.signupValidator = function(req, res, next){
    //checks that name field is not empty
    req.check("name", "Name is required").notEmpty();
    //checks email field is between 1 and 30 characters
    req.check("email", "Email must be 1 to 30 characters").matches(/.+\@.+\..+/).withMessage("Email must contain '@' symbol").isLength({
        min: 1,
        max: 30,
    })
    //checks that password field is not empty
    req.check("password", "Password is required").notEmpty();
    //checks that password is at least 5 characters and at least one number
    req.check("password").isLength({min: 5}).withMessage("Password must contain at least 5 characters").matches(/\d/).withMessage("Password must contain at least one number");
    
    //gathers errors in const err
    const errs = req.validationErrors();
    //if errors
    if(errs){
        //returns first error in json format
        const error1 = errs.map(error => error.msg)[0];
        return res.status(400).json({error: error1});
    }
    //moves to next process
    next();
};


