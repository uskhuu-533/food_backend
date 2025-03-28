import bcrypt from "bcrypt";

import { User } from "../../models/users.model.js";

export const changePassword = async (req, res) => {
  try {
    const { email, password, confirm } = req.body;
    console.log(req.body);
    
    if (confirm !== password) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
    }else{
    const hashedPassword = bcrypt.hashSync(password, 4);
    const updatePassword = await User.findOneAndUpdate(
      { email: email },
      { hashedPassword: hashedPassword },
      { new: true }
    );
    res.status(200).send("password change succesful");
}
  } catch (err) {
    console.log(err);
    res.status(500).send(`failed ro sign up : ${err}`);
  }
};
