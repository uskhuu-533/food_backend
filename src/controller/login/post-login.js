import bcrypt from "bcrypt";
import { User } from "../../models/users.model.js";
import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config'
export const checkPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }    
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      res.send("Wrong password or email").status(404);
    } 
    const token = jsonwebtoken.sign({UserId:user._id, email:user.email, role:user.role}, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn:"8h"})
    res.send({token:token, role : user.role}).status(200)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
