import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  title: { type: String, require: true},
  createdAt : {type:Date, require:true, default:new Date()}
});
export const Category = mongoose.model("categories", usersSchema);
