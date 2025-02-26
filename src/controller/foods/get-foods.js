import { Foods } from "../../models/foods.model.js";

export const getFoods = async (req, res) => {
    const {category} = req.params    
  try {
    if(category){
      const foods  = await Foods.find({category:category})
      res.status(200).send(foods)
    }else{
      res.status(500).send("category not found getFoods")
    }
  } catch (err) {
    res.status(500).send("Failed");
    console.log(err);
  }
};