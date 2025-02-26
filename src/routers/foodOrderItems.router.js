import e from "express";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
import { postFoodOrderItems } from "../controller/foodOrderItems/post-Food-Order-Items.js";
import { isValidOrderItem } from "../middleware/order-Items/addOrderItem.js";
import { orderRouter } from "./order.router.js";
import { getFoodOrderItems } from "../controller/foodOrderItems/get-Food-Order-Items.js";
export const orderItemsRouter = e.Router()

orderItemsRouter.get('/', authenticationJWT, getFoodOrderItems)
orderItemsRouter.post('/:id', authenticationJWT , isValidOrderItem, postFoodOrderItems)
