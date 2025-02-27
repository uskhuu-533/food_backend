import { FoodOrderItems } from "../../models/foodOrderItem.model.js";

export const putOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { count } = req.body;


    const existingItem = await FoodOrderItems.findOne({ _id: id });

    if (!existingItem) {
      return res.status(404).send("Order item not found");
    }

    const item = await FoodOrderItems.findOneAndUpdate(
      { _id: id },
      { quantity: existingItem.quantity + count },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).send(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
