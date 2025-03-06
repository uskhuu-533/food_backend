import mongoose from "mongoose";

const foodsSchema = new mongoose.Schema(
    {
        food_name: { type: String, require: true },
        food_description: { type: String, require: true },
        price : {type:String, require : true},
        food_image : {type: String , require : true},
        category : {type : mongoose.Types.ObjectId, ref:"categories" , require : true},
        createdAt : {type : Date, default:new Date(), require:false},
        updatedAt : {type :Date, require:false }
      }
    )
export const Foods = mongoose.model("foods", foodsSchema)