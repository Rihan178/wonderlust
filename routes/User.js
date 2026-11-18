const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

//signup routes
router.route("/signup")
.get(wrapAsync(userController.getSignup))
.post(wrapAsync(userController.postSignup));


//login routes
router.route("/login")
.get(wrapAsync(userController.getLogin))
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(userController.postLogin));

//logout route
router.get("/logout",wrapAsync(userController.logout));


module.exports = router;