import mongoose from "mongoose"
import { FoodOrderItems } from "../../models/foodOrderItem.model.js"

export const getOneItem = async (req, res) =>{
    const { id } = req.params
    try{
        const item = await FoodOrderItems.aggregate([
            {
                $match : {_id : new mongoose.Types.ObjectId(id)}
            },
            {
                $lookup:{
                    from : "foods",
                    localField: "food",
                    foreignField: "_id",
                    as: "foods"
                }
            }
        ])
        console.log(item)
        
        res.send(item).status(200)
    }catch(error){
        res.send(error).status(500)
    }
}