const mongoose = require("mongoose");
const express = require("express")
const router = express.Router();
const Listing = require("../models/listing.js");
const User = require ("../models/user.js")
const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy
const session = require('express-session');
const { saveRedirectUrl } = require("../midcom.js");

const userController = require ("../controllers/user.js")



router.get("/signup", (userController.renderSignupForm))



router.post("/signup", (userController.signup))
router.use(passport.initialize());
router.use(passport.session());


router.get("/login" , (userController.renderLoginForm),

)
 
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",  {
         failureRedirect:"/login",
         failureFlash: true,}
    ), userController.login
);


// async (req, res) =>{
//     let redirectUrl = res.locals.redirectUrl //"listings"
//     res.redirect(res.locals.redirectUrl);
//     req.flash("success", "you are logged in!");



router.get('/logout', userController.logout)


module.exports = router;