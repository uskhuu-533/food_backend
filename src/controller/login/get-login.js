import bcrypt from "bcrypt";
import { User } from "../../models/users.model.js";

export const checkPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).send("User not found");
    }
    console.log(user);
    
    
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
console.log(passwordCorrect);

    if (passwordCorrect) {
      return res.status(200).send("Signed in successfully");
    } else {
      return res.status(400).send("Wrong password or email");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
