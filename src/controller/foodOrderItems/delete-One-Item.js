import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const deleteOneItem = async (req, res) => {
    const { id } = req.params
    console.log(id);
    
    try {
        const deletedItem = await FoodOrderItems.findByIdAndDelete({_id:id})
        if (!deletedItem) {
            res.status(400).send("item not found")
        }
        res.status(200).send(`deleted : ${deletedItem}`)
    } catch (error) {
        res.status(500).send(error)
    }
}