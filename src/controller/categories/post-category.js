import { Category } from "../../models/categories.model.js";

export const postCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      const result = new Category({ title });
      await result.save();
      res.status(200).send("category added");
    } else {
      res.status(400).send("category vaild");
    }
  } catch (err) {
    console.log(err);
  }
};
