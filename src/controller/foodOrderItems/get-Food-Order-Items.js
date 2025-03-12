import mongoose from "mongoose"
import { FoodOrderItems } from "../../models/foodOrderItem.model.js"


export const getFoodOrderItems = async (req, res) => {
    try {
        const item = await FoodOrderItems.aggregate([
                   {
                       $match : {user : new mongoose.Types.ObjectId(req.userId)}
                   },
                   {
                       $lookup:{
                           from : "foods",
                           localField: "food",
                           foreignField: "_id",
                           as: "food"
                       }
                   },
                   {
                    $addFields : {
                        food: { $arrayElemAt: ["$food", 0] } 
                    }
                   }
               ])
         
               res.send(item).status(200)
    } catch (error) {
        res.send(`failed to get foodOrder items : ${error}`).status(500)
    }
}