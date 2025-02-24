import { Foods } from "../../models/foods.model.js";

export const deleteFood = async (req, res) => {
    const {id} = req.params
    try {
        const foods = await Foods.findByIdAndDelete({_id:id})
        res.send("deleted").status(200)
    } catch (error) {
        res.send(`failed to delete ${error}`).status(500)
        
    }
}