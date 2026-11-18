const User = require("../models/user.js");


//get signup route
module.exports.getSignup = async(req,res)=>{
   res.render("users/signup.ejs");
};


//post signup route
module.exports.postSignup = async(req,res)=>{
    try{
   let {username,email,password} = req.body;
   const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
    if (err){
        return next(err);
    }
   req.flash("success","Welcome to Wonderlust!");
   res.redirect("/listing");
   });
    }catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }
};

//get login route
module.exports.getLogin = async(req,res)=>{
    res.render("users/login.ejs");
};

//post login route
module.exports.postLogin = async(req,res)=>{
req.flash("success","Welcome back to Wonderlust!");
let redirectUrl = res.locals.redirectUrl || "/listing";
res.redirect(redirectUrl);
};


//logout route
module.exports.logout = async(req,res)=>{
   req.logOut((err)=>{
    if (err){
        return next(err);
    }
    req.flash("success","Your are Logged Out!");
    res.redirect("/listing");
   });
};