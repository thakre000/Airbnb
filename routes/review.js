const express = require("express")
const router = express.Router({mergeParams : true})
const Listing = require("../models/listing.js");
const {listingSchema, reviewSchema} = require ("../models/listing.js")
const Review = require ("../models/review.js");
const { isLoggedIn, isReviewAuthor} = require("../midcom.js");

const reviewController = require ("../controllers/review.js")

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new express(400, errmsg);
    } else {
        next();
    }
 }

//review route
router.post("/",  isLoggedIn, (reviewController.newReview) );
    //delete route review(rwd, res )




    router.delete("/:reviewId",  isLoggedIn,(reviewController.deleteReview)
     
      )

    module.exports = router;
    