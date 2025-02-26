import e from "express";
import { postFoodOrder } from "../controller/food-Orders.js/post-Food-Order.js";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
 export const orderRouter = e.Router()
 orderRouter.post('/', authenticationJWT ,postFoodOrder)