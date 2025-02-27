import { FoodOrderItems } from "../../models/foodOrderItem.model.js";

export const isZero = async (req, res, next) => {
    const { id } = req.params;
    const {count} = req.body
    try {
        const existingItem = await FoodOrderItems.findOne({ _id: id });
        
        if (!existingItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        
        if (existingItem.quantity === 1 && count === -1) {
        
            await FoodOrderItems.deleteOne({ _id: id });

            return res.status(200).json({ message: "Item removed from cart" });
        }
        
        next();
    } catch (error) {
        res.status(500).json({ message: `isZero : ${error.message}` });
    }
}
