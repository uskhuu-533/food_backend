import e from "express";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
import { postFoodOrderItems } from "../controller/foodOrderItems/post-Food-Order-Items.js";
import { isValidOrderItem } from "../middleware/order-Items/addOrderItem.js";

import { getFoodOrderItems } from "../controller/foodOrderItems/get-Food-Order-Items.js";
import { isAdded } from "../middleware/order-Items/isItemAdded.js";
import { deleteItems } from "../controller/foodOrderItems/delete-Food-Order-Items.js";
import { putOrderItem } from "../controller/foodOrderItems/put-order-item.js";
import { isZero } from "../middleware/order-Items/isZeroCount.js";
import { deleteOneItem } from "../controller/foodOrderItems/delete-One-Item.js";
import { getOneItem } from "../controller/foodOrderItems/get-Item-id.js";
import { patchItem } from "../controller/foodOrderItems/patch-Items.js";

export const orderItemsRouter = e.Router()

orderItemsRouter.get('/', authenticationJWT, getFoodOrderItems)
orderItemsRouter.get('/:id', getOneItem)
orderItemsRouter.post('/:id', authenticationJWT , isValidOrderItem, isAdded, postFoodOrderItems)
orderItemsRouter.delete('/', deleteItems)
orderItemsRouter.put('/:id', putOrderItem)
orderItemsRouter.delete('/:id', deleteOneItem)
orderItemsRouter.patch("/", authenticationJWT, patchItem)