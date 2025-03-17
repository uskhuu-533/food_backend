import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const deleteItems = async (req, res) =>{
    try {
        const deleteItems = await FoodOrderItems.deleteMany({})
        res.status(200).send('deleted items')
    } catch (error) {
        res.status(500).send("server error deleteItems")
    }
}