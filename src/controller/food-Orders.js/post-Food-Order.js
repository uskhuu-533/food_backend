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
    console.log(order._id);
    
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { orderedFood: order._id } }, // Fixed the typo here
      { new: true }
    );
    console.log(updatedUser);
    
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(order);
  } catch (error) {
    console.log(error);
    
    res.status(500).send("Server error");
  }
};
