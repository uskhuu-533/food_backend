import e from "express";
import { postFoodOrder } from "../controller/food-Orders.js/post-Food-Order.js";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
import { getOrder } from "../controller/food-Orders.js/get-Food-Order.js";
import { isOrder } from "../middleware/food/orders/isOrder.js";
 export const orderRouter = e.Router()
 orderRouter.post('/', authenticationJWT ,postFoodOrder)
 orderRouter.get('/', authenticationJWT, isOrder, getOrder)