const mongoose = require('mongoose');
const intData = require("./data.js");
const Listing = require('../models/listen.js');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/wonderlust');
};
main().then(()=>{
    console.log("connected succesfully");
})
.catch((err)=>{
    console.log("failed to connect");
});
const intdb = async ()=> {
    await Listing.deleteMany({});
   intData.data = intData.data.map((obj)=> ({...obj,owner:"6a8a9963cc369a70c3bfeb1d"} ));
    await Listing.insertMany(intData.data); 
    console.log("save sucessfully");
};
intdb();