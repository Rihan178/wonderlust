const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const {storage}=require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({storage});


// index routes
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing ,wrapAsync(listingController.newPost));


// new route
router.get("/new",isLoggedIn,wrapAsync(listingController.newGetPost));

// id routes
router.route("/:id")
.get(wrapAsync(listingController.show))
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,wrapAsync( listingController.editPost))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroy));



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editGet));


module.exports = router;
