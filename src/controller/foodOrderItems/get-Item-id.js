import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const getOneItem = async (req, res) =>{
    const { id } = req.params
    try{
        const item = await FoodOrderItems.findById({_id:id})
        console.log(item)
        
        res.send(item).status(200)
    }catch(error){
        res.send(error).status(500)
    }
}