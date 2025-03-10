import { FoodOrderItems } from "../../models/foodOrderItem.model.js";

export const postFoodOrderItems = async (req, res) => {
  const { count } = req.body;
  const { id } = req.params;

  const quantity = parseInt(count)

  try {
    const foodOrderItems = new FoodOrderItems({
      food: id,
      quantity: quantity,
      user : req.userId
    });
    await foodOrderItems.save();
    res.status(200).send(foodOrderItems);
  } catch (error) {
    res.status(500).send(error)
}}
