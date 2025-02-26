import { FoodOrderItems } from "../../models/foodOrderItem.model.js";

export const postFoodOrderItems = async (req, res) => {
  const { count } = req.body;
  const { id } = req.params;

  const quantity = parseInt(count)
  console.log(typeof(quantity));
  try {
    const foodOrderItems = new FoodOrderItems({
      food: id,
      quantity: quantity,
      user : req.userId
    });
    await foodOrderItems.save();
    res.send(foodOrderItems).status(200);
  } catch (error) {
    res.send(`failed to add cart : ${error}`).status(500);
  }
};
