import { Category } from "../../models/categories.model.js";
import { Foods } from "../../models/foods.model.js";

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
    const foods = await Foods.find()
    res.status(200).send({categories:categories, foods:foods.length})
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
