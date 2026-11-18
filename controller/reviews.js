const Listing = require("../models/listen.js");
const Review = require("../models/review.js");


// review post route
module.exports.reviewPost = async(req,res)=>{
    let {id} = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();
  listing.reviews.push(newReview);
  await listing.save();
   req.flash("success","New Review Created!");
  res.redirect(`/listing/${id}`);
};

//review delete route
module.exports.destroy = async(req,res)=>{
let {id ,reviewId} = req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);
 req.flash("success","Review Deleted!");
res.redirect(`/listing/${id}`);
};