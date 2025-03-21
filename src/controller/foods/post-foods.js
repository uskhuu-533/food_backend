import { Foods } from "../../models/foods.model.js";

export const postFood = async (req, res) => {
  const { food_description, food_name, price, food_image } = req.body;
  const { category } = req.params;
  try {
    const newfood = new Foods({
      food_description,
      food_name,
      price,
      food_image,
      category,
    });
    await newfood.save();
    res.status(200).send(`food added`);
  } catch (error) {
    console.log(error);
  }
};
