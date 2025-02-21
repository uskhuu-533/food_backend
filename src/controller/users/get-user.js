import fs from "fs/promises";
import { User } from "../../models/users.model.js";

export const getUser = async (req, res) => {
  try {
    const usersFromDB = await User.find();
    res.status(200).send(usersFromDB);
  } catch (err) {
    console.log(err);
  }
};
