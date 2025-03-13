import { Foods } from "../../models/foods.model.js";
import mongoose from "mongoose";
export const getFoods = async (req, res) => {
    const {category} = req.params    
  try {
    if(category){
      const foods  = await Foods.find({category:category}).populate('category').exec()
      res.status(200).send(foods)
    }else{
      res.status(500).send("category not found getFoods")
    }
  } catch (err) {
    res.status(500).send("Failed");
    console.log(err);
  }
};