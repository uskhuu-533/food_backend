import { Category } from "../../models/categories.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match : {}
      },
      {
        $lookup : {
          from : "foods",
          localField : "_id",
          foreignField : "category",
          as : "food_count"
        }
      },
      {
        $project : {
          title : 1,
          food_count : {size : "$foods"}
        }
      }
    ])
    res.status(200).send(categories)
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
