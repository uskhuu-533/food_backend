import express from "express"
import cors from "cors"
import { userRouter} from "./routers/user-router.js";
import mongoose from "mongoose";
import { categoryRouter } from "./routers/category-router.js";
import { foodRouter } from "./routers/food-router.js";
import 'dotenv/config'
import {  orderItemsRouter } from "./routers/foodOrderItems.router.js";
import { orderRouter } from "./routers/order.router.js";


const app = express();
const port = 3000;


app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3002"] }));
//path => GET, POST, PUT, DELETE
app.use(express.json()); 
app.use(`/users`, userRouter);
app.use("/category", categoryRouter)
app.use('/food', foodRouter)
app.use('/foodorderitems', orderItemsRouter)
app.use('/foodorder', orderRouter)
const mongoURI = process.env.MY_DB_URL
const connectDB = async () => {
  try{
    await mongoose.connect(mongoURI)
    console.log("mongoDB connected");
    
  }catch(err){
    console.log(err);
    
  }
}
connectDB()


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

