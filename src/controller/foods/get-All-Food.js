import { Foods } from "../../models/foods.model.js"

export const getAllFood = async (req, res) => {
    try {
        const allFoods = await Foods.find()
        res.send(allFoods).status(200)
    } catch (error) {
        res.send(`failed get all foods : ${error}`).status(500)
    }
}