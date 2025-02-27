import { FoodOrder } from "../../../models/foodOrder.model.js"

export const isOrder = async (req, res, next) =>{
    try {
        const orders = FoodOrder.find({user:req.userId})
        if (!orders) {
            res.status(400).send("order not found")
        }
        next()
    } catch (error) {
        res.status(500).send("isOrder")
    }   
}