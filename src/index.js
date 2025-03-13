import express from "express";
import cors from "cors";

import "dotenv/config";

import connectDB from "./connectDB.js";
import { userRouter } from "./routers/user.routes.js";
import { orderRouter } from "./routers/order.routes.js";
import { orderItemsRouter } from "./routers/foodOrderItems.routes.js";
import { categoryRouter } from "./routers/category.routes.js";
import { foodRouter } from "./routers/food.routes.js";

const app = express();
const port = 3000;
connectDB();
app.use(cors());

//path => GET, POST, PUT, DELETE
app.use(express.json());
app.use(`/users`, userRouter);
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/foodorderitems", orderItemsRouter);
app.use("/foodorder", orderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
