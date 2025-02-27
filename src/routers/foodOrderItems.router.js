import e from "express";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
import { postFoodOrderItems } from "../controller/foodOrderItems/post-Food-Order-Items.js";
import { isValidOrderItem } from "../middleware/order-Items/addOrderItem.js";

import { getFoodOrderItems } from "../controller/foodOrderItems/get-Food-Order-Items.js";
import { isAdded } from "../middleware/order-Items/isItemAdded.js";
import { deleteItems } from "../controller/foodOrderItems/delete-Food-Order-Items.js";
import { putOrderItem } from "../controller/foodOrderItems/put-order-item.js";
import { isZero } from "../middleware/order-Items/isZeroCount.js";

export const orderItemsRouter = e.Router()

orderItemsRouter.get('/', authenticationJWT, getFoodOrderItems)
orderItemsRouter.post('/:id', authenticationJWT , isValidOrderItem, isAdded, postFoodOrderItems)
orderItemsRouter.delete('/', authenticationJWT, deleteItems)
orderItemsRouter.put('/:id',isZero, putOrderItem)