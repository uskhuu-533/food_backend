import { FoodOrder } from "../../models/foodOrder.model.js"

export const getOrder = async (req, res) => {
    try {
        const orders = await FoodOrder.find({user:req.userId})
        
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send("server error getOrder")
    }
}