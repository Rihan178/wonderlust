const mongoose = require("mongoose");

const Schema = mongoose.Schema;


 reviewSchema = new Schema({
  comment:String,
  rating:{
    type:Number,
    min:0,
    max:5
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

Review = mongoose.model("Review",reviewSchema);
module.exports = Review;