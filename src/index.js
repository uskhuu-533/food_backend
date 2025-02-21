import express from "express"
import cors from "cors"
import { userRouter} from "./routers/user-router.js";
import mongoose from "mongoose";
import { categoryRouter } from "./routers/category-router.js";


const app = express();
const port = 3000;


app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3002"] }));
//path => GET, POST, PUT, DELETE
app.use(express.json()); 
app.use(`/users`, userRouter);
app.use("/category", categoryRouter)

const mongoURI = 'mongodb+srv://uskhuunymdavaa9:@cluster0.vnn3t.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0'
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
// {
//     "userName" : "12",
//     "password" : "12",
//     "firstName" : "a",
//     "lastName" : "b"
//     }

// {
//     "firstName" : "a",
//     "updatedName" : "c"
//     }
