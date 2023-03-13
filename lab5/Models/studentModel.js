mongoose = require("mongoose");
URL = "mongodb://localhost:27017/school";
mongoose.connect(URL,{useNewUrlParser:true});

let studentsSchema = new mongoose.Schema({
    name:{type:String, required:true, minlength:3},
    email:{type:String,required:true},
    courses:{type:Array},
  });
  
  module.exports = mongoose.model("students", studentsSchema);