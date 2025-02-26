import mongoose from "mongoose";

const foodOrderItemsSchema = new mongoose.Schema({
    food : {type : mongoose.Types.ObjectId, require : true, ref:"foods"},
    quantity : {type : Number, require:true},
    user : {type : mongoose.Types.ObjectId, require : true}
})

export const FoodOrderItems = mongoose.model('foodOrderItems', foodOrderItemsSchema)