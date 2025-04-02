import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, require: true },
  hashedPassword: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  address: { type: String, require: true, default: "" },
  role: {
    type: String,
    require: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  orderedFood: [{ type: mongoose.Types.ObjectId ,  ref: "foodorder" , require:true}],
  address: { type: String, require: true },
  isVerrified: { type: Boolean, require: true },
  createdAt : {type : Date, require:true, default: Date.now()}
});
export const User = mongoose.model("User", usersSchema);
