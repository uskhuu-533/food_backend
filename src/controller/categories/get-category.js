import { Category } from "../../models/categories.model.js";

export const getCategory = async (req, res) => {
  const { id } = req.params
  try {
    const categories = await Category.findById(id)
    res.status(200).send(categories)
  } catch (err) {
    res.status(500).send("Failed");
    console.log(err);
  }
};
