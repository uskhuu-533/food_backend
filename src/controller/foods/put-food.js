import mongoose from "mongoose";
import { Foods } from "../../models/foods.model.js";

export const putFood = async (req, res) => {
  const { id } = req.params;
  const { category, food_name, food_description, food_image, price } = req.body;
  
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID format"
      });
    }
    const update = {
      category,
      food_image,
      food_description,
      price,
      food_name,
      updatedAt: new Date()
    };


    const editedFood = await Foods.findByIdAndUpdate(
      id,  
      update,
      { 
        new: true,
        runValidators: true  
      }
    );


    if (!editedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: editedFood
    });

  } catch (error) {
    console.error("Error updating food:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating food",
      error: error.message
    });
  }
}