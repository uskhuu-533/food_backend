import { FoodOrder } from "../../models/foodOrder.model.js"

export const putOneOrder = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const order = await FoodOrder.findByIdAndUpdate({_id:id}, {status:status})
        res.send("status changed").status(200)
    } catch (error) {
        res.send(error).status(500)
    }
}