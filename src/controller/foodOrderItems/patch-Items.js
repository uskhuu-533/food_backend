import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const patchItem = async (req, res) => {
    
    try {
        const items = await FoodOrderItems.updateMany({user:req.userId}, {user:null})
        if (!items) {
            res.status(400).send("item not found")
        }
        res.status(200).send("user cleared")
    } catch (error) {
        res.status(500).send(error)
    }
}