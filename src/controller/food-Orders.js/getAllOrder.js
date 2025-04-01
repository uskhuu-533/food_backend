import { FoodOrder } from "../../models/foodOrder.model.js"

export const getAllOrder = async (req, res) => {
  const { page,  } = req.params
  const { startDate, endDate } = req.query;
  const pageInt = parseInt(page)
    try {
      const start = startDate ? new Date(startDate) : new Date("2025-01-01");
      const end = endDate ? new Date(endDate) : new Date();
       const orders = await FoodOrder.aggregate([
             {
               $match: { createdAt: { $gte: start, $lte: end },}
             },
             {
               $lookup: {
                 from: "users",
                 localField: "user",
                 foreignField: "_id",
                 as: "userData",
               },
             },
             {
               $lookup: {
                 from: "foodorderitems",
                 localField: "foodOrderItems",
                 foreignField: "_id",
                 as: "orderItems",
               },
             },
             {
               $lookup: {
                 from: "foods",
                 localField: "orderItems.food",
                 foreignField: "_id",
                 as: "foodData",
               },
             },
             {
               $addFields: {
                 orderItems: {
                   $map: {
                     input: "$orderItems",
                     as: "item",
                     in: {
                       _id: "$$item._id",
                       food: {
                         $arrayElemAt: [
                           {
                             $filter: {
                               input: "$foodData",
                               as: "food",
                               cond: { $eq: ["$$food._id", "$$item.food"] },
                             },
                           },
                           0,
                         ],
                       },
                       quantity: "$$item.quantity",
                     },
                   },
                 },
               },
             },
             {
               $project: {
                 _id: 1,
                 totalPrice: 1,
                 status: 1,
                 createdAt: 1,
                 updatedAt: 1,
                 userData: { $arrayElemAt: ["$userData", 0] },
                 orderItems: 1,
               },
             },
           ]);
           const reversedOrder = orders.reverse()
           const slicedOrder = reversedOrder.slice((pageInt-1)*12, pageInt*12)
           res.status(200).json({data:slicedOrder, totalPage:Math.floor(orders.length/12)+1, totalResults:orders.length});
    } catch (error) {
        res.send(error).status(500)
    }
}