import fs from "fs/promises";
import { User } from "../../models/users.model.js";

export const getUser = async (req, res) => {
  const _id = req.userId
  try {
    const usersFromDB = await User.findById({_id});
    res.status(200).send(usersFromDB.email);
  } catch (err) {
    console.log(err);
  }
};
