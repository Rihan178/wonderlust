const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isReviewAuthor,isLoggedIn} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");



// review post route
router.post("/",validateReview,wrapAsync(reviewController.reviewPost));


//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroy));

module.exports = router;