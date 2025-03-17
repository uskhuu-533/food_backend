import { FoodOrder } from "../../models/foodOrder.model.js";

export const putOrder = async (req, res) => {
  const { ids, status } = req.body;
  try {
    const result = await FoodOrder.updateMany(
      {_id : {$in: ids}},
      {status : status}
    )
    
    res.json({ message: "Orders updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
