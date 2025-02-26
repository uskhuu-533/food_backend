import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId, ref:"users", require:true},
    totalPrice : {type :Number, require:true},
    foodOrderItems :[ {type : mongoose.Types.ObjectId, ref:'foodOrderItems', require:true}],
    status : {type : String, enum: ["PENDING", 'CANCELLED', 'DELIVERED'], require:true, default:"PENDING"},
    createdAt : {type : Date, require:true, default:new Date()},
    updatedAt : {type : Date , require:false}
})
export const FoodOrder = mongoose.model("foodorder", foodOrderSchema)