import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const isAdded = async (req, res, next) => {
    const {id} = req.params
    const {count} = req.body
    try {
        const item = await FoodOrderItems.findOneAndUpdate({food : id, user : req.userId}, {quantity:count},{new:true})
    
        if (!item) {
           return next()
        }
        res.status(200).send("quintity updated")
    } catch (error) {
        res.status(500).send(error)
    }
}