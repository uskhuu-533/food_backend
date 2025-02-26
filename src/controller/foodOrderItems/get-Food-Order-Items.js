import { FoodOrderItems } from "../../models/foodOrderItem.model.js"


export const getFoodOrderItems = async (req, res) => {
    try {
        const foodOrderItem = await FoodOrderItems.find({user : req.userId})
        res.status(200).send(foodOrderItem)
    } catch (error) {
        res.send(`failed to get foodOrder items : ${error}`).status(500)
    }
}