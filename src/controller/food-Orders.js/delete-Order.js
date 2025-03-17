import { FoodOrder } from "../../models/foodOrder.model.js"

export const deleteOrders = async (req, res) =>{
    try {
        await FoodOrder.deleteMany({})
        res.send('deleted').status(200)
    } catch (error) {
        res.send(error).status(500)
    }
}