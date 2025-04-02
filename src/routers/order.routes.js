import e from "express";
import { postFoodOrder } from "../controller/food-Orders.js/post-Food-Order.js";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
import { getOrder } from "../controller/food-Orders.js/get-Food-Order.js";
import { isOrder } from "../middleware/food/orders/isOrder.js";
import { getAllOrder } from "../controller/food-Orders.js/getAllOrder.js";
import { putOrder } from "../controller/food-Orders.js/putOrder.js";
import { putRequire } from "../middleware/order-Items/putRequire.js";
import { deleteOrders } from "../controller/food-Orders.js/delete-Order.js";
import { putOneOrder } from "../controller/food-Orders.js/put-One-Order.js";
import { adminAuhh } from "../middleware/user/admin-auth.js";
export const orderRouter = e.Router();
orderRouter.post("/", authenticationJWT, postFoodOrder);
orderRouter.get("/", authenticationJWT, isOrder, getOrder);
orderRouter.get("/admin/:page",adminAuhh ,getAllOrder);
orderRouter.put('/',putRequire,adminAuhh, putOrder)
orderRouter.delete('/',adminAuhh ,deleteOrders)
orderRouter.put('/:id',adminAuhh, putOneOrder)