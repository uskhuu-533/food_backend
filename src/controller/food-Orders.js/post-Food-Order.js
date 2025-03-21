import { FoodOrder } from "../../models/foodOrder.model.js";

export const postFoodOrder = async (req, res) => {
  const { foodOrderItems, totalPrice } = req.body;
  try {
    const order = new FoodOrder({
      user: req.userId,
      foodOrderItems: foodOrderItems,
      totalPrice: totalPrice,
    });
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
