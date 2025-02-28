import { User } from "../../models/users.model.js";

export const editUser = async (req, res) => {
  const { address } = req.body;
  try {
    const editedUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      { address: address },
      { new: true, runValidators: true }
    );
    if (editedUser) {
    } else {
      res.send("user not found");
    }
    res.status(200).send(editedUser)
  } catch (err) {
    console.log(err);
    res.status(500).send("error edituser")
  }
};
