import mongoose from "mongoose";
import { FoodOrder } from "../../models/foodOrder.model.js";

export const getOrder = async (req, res) => {
  try {
    const orders = await FoodOrder.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.userId) },
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

    console.log(orders);

    res.status(200).send(orders);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error getOrder");
  }
};
