import { Category } from "../../models/categories.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).send(categories)
  } catch (err) {
    res.status(500).send("Failed");
    console.log(err);
  }
};
