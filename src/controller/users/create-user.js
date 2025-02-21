
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { User } from "../../models/users.model.js";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password && !email) {
      res.status(500).send("email and password vaild");
    }
    if (!password) {
      res.status(500).send("password is vaild");
    }
    if (!email) {
      res.status(500).send("email is vaild");
    } 
    if(password && email){
      const saltRounds = 4;
      console.log(password);
      console.log(typeof password);

      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({ email, hashedPassword });
      await newUser.save();
      res.status(200).send("Sign up succesful");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`failed ro sign up : ${err}`);
  }
};
