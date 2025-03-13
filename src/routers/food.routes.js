import e from "express";
import { postFood } from "../controller/foods/post-foods.js";
import { getFoods } from "../controller/foods/get-foods.js";
import { putFood } from "../controller/foods/put-food.js";
import { deleteFood } from "../controller/foods/delete-foods.js";
import { getAllFood } from "../controller/foods/get-All-Food.js";
import { getOneFood } from "../controller/foods/get-One-Food.js";
import { isfoodValid } from "../middleware/food/isdetailvalid.js";

export const foodRouter = e.Router()

foodRouter.post('/:id',isfoodValid, postFood)
foodRouter.get('/:category', getFoods)
foodRouter.put('/:id', putFood)
foodRouter.delete('/:id', deleteFood)
foodRouter.get('/', getAllFood)
foodRouter.get('/orderitem/:id', getOneFood)