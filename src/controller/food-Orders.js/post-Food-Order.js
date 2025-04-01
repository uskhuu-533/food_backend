import { FoodOrder } from "../../models/foodOrder.model.js";
import { User } from "../../models/users.model.js";

export const postFoodOrder = async (req, res) => {
  const { foodOrderItems, totalPrice } = req.body;
  try {
    const order = new FoodOrder({
      user: req.userId,
      foodOrderItems: foodOrderItems,
      totalPrice: totalPrice,
    });
    await order.save();
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { foodOrderItems: order._id } },
      {new:true}
    );
    res.send(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
