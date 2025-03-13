import { FoodOrder } from "../../models/foodOrder.model.js";

export const putOrder = async (req, res) => {
  const { ids, status } = req.body;
console.log(ids);

  if (!Array.isArray(ids) || !status) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    await Promise.all(
      ids.map(async (id) => {
        await FoodOrder.findByIdAndUpdate({ _id:id },{ status:status }, {new:true });
      })
    );

    res.json({ message: "Orders updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
