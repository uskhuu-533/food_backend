import e from "express";
import { postFood } from "../controller/foods/post-foods.js";
import { getFoods } from "../controller/foods/get-foods.js";
import { putFood } from "../controller/foods/put-food.js";
import { deleteFood } from "../controller/foods/delete-foods.js";

export const foodRouter = e.Router()

foodRouter.post('/:id', postFood)
foodRouter.get('/:id', getFoods)
foodRouter.put('/:id', putFood)
foodRouter.delete('/:id', deleteFood)