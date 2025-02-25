import bcrypt from "bcrypt";

import { User } from "../../models/users.model.js";

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 4;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({ email, hashedPassword });
    await newUser.save();
    res.status(200).send("Sign up succesful");
  } catch (err) {
    console.log(err);
    res.status(500).send(`failed ro sign up : ${err}`);
  }
};
