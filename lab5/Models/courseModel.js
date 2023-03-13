mongoose = require("mongoose");
URL = "mongodb://localhost:27017/school";

mongoose.connect(URL,{useNewUrlParser:true});

let CoursesSchema = new mongoose.Schema({
    title:{type:String, required:true},
    duration:{type:Number,required:true},
  });
  
  module.exports = mongoose.model("courses", CoursesSchema);