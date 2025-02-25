import mongoose from "mongoose";

const foodOrderItemsSchema = new mongoose.Schema({
    food : {type : mongoose.Types.ObjectId, require : true, ref:"foods"},
    quanity : {type : Number, require:true}
})