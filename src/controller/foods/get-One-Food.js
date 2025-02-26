import { Foods } from "../../models/foods.model.js";

export const getOneFood = async (req, res) => {
    const {id} = req.params    
  try {
    if(id){
      const food  = await Foods.findById({_id:id})
      res.status(200).send(food)
    }else{
      res.status(500).send("food not found getFoods")
    }
  } catch (err) {
    res.status(500).send("Failed");
    console.log(err);
  }
};