const Listing = require("../models/listen.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken:mapToken});


//index route
module.exports.index = async (req,res) => {
    let allListings = await Listing.find({});
     res.render("listing/index.ejs",{allListings});
};


// new get route
module.exports.newGetPost = async (req,res) =>{
  res.render("listing/new.ejs");
};

//new post route
module.exports.newPost = async(req,res)=>{
  let response = await geocodingClient
  .forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
  })
  .send();
    let url = req.file.path;
    let filename = req.file.filename;
    newList = new Listing(req.body.listing);
    newList.owner = req.user._id; 
    newList.image ={url,filename};
    newList.geometry = response.body.features[0].geometry;
   await newList.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listing");
};

//show route
module.exports.show = async (req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("listing");
    }
    res.render("listing/show.ejs",{listing})
};


// edit get route
module.exports.editGet = async (req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested does not exist!");
      res.render("listing");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_150,w_150");
    res.render("listing/edit.ejs",{listing,originalImageUrl});
};

//edit post route
module.exports.editPost = async (req,res)=>{
    let {id}= req.params;
  let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file != "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
}
  req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
};


//delete route
module.exports.destroy = async (req,res)=>{
    let {id}= req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!");
     res.redirect("/listing");
};