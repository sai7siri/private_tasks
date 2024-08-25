
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      name:{
         type: String,
         required : true
      },
      email:{
         type: String,
         required : true,
         unique : true
      },
      password:{
         type: String,
         required : true
      },
      profile:{
         type: String,
         default : ""
      },
      tasks :[
         {
            type : mongoose.Types.ObjectId,
            ref : "task"
         }
      ]
   },
   {
      timestamps:  true
   }
);

module.exports = mongoose.model("TaskUser" , userSchema);