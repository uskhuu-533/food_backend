import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId, ref:"users", require:true},
    totalPrice : {type :Number, require:true},
    foodOrderItems : {type : mongoose.Types.Array, ref:'foodOrderItems', require:true},
    createdAt : {type : Date, require:true},
    updatedAt : {type : Date , require:false}
})
export const FoodOrder = mongoose.model("foodOrder", foodOrderSchema)