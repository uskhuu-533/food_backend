import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({
    email: { type: String, require :true},
    hashedPassword : {type : String, require : true}
})
export const User = mongoose.model("User", usersSchema)