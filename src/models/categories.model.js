import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  title: { type: String, require: true },
  foods : [{
    food_name: { type: String, require: true },
    food_description: { type: String, require: true },
    price : {type:String, require : true},
    food_image : {type: String , require : true},
    category : {type : String, require : true}
  }]
});
export const Category = mongoose.model("categories", usersSchema);
