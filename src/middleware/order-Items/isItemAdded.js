import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const isAdded = async (req, res, next) => {
    const {id} = req.params
    const {count} = req.body
    try {
        const item = await FoodOrderItems.findOneAndUpdate({food : id}, {quantity:count})
        if (!item) {
            next()
        }
    } catch (error) {
        
    }
}