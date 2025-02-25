import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  title: { type: String, require: true }
});
export const Category = mongoose.model("categories", usersSchema);
