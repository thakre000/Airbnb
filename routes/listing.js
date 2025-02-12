const express = require("express")
const router = express.Router()
const Listing = require("../models/listing.js");
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const {isLoggedIn, isOwner} = require("../midcom.js")
const Review = require ("../models/review.js");
const {listingSchema, reviewSchema} = require ("../models/listing.js")
 const review = require ("../models/review.js");
const { constrainedMemory } = require("process");
const path = require("path");
const multer = require ("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer ({storage});

const listingController = require ("../controllers/listings.js");

 const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);r
    
    if (error) {
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new express(400, errMsg);
    } else {
        next();
    }
 }
 
 //Update Router
router.put(
  "/:id", 
  async (req, res) => {
    let { id } = req.params;
   
    req.flash("success", "Listing Updated")
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });
  //Index Route
  router.get("/", (listingController.index)
    
  );
  
  //New Route
  router.get("/new", isLoggedIn, (listingController.renderNewForm));
  
  //Show Route
  router.get("/:id", isLoggedIn,( listingController.showNewForm));
  
  //Create Route
  router.post("/",
    //  isLoggedIn,(listingController.createListing),

upload.single('listing[image]'), (req,res) =>{
  res.send(req.file);
});
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn, (listingController.renderEditForm)
    );
  
  //Delete Route
  router.delete("/:id", isLoggedIn,  (listingController.deleteForm)
    );
  module.exports = router ;