// import { Category } from "../../models/categories.model.js";

// export const putCategory = async (req, res) => {
   
//     const { food_description, food_name, price, food_image , title } = req.body;

// existingCategory
//     try {

//         const  = await Category.findOne({title});
//         if (!existingCategory) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         if (typeof food_image !== "string") {
//           return res.status(400).json({ error: "Invalid food_image URL" });
//       }

    
//         existingCategory.foods.push({ food_description, food_name, price, food_image});
//         const updatedCategory = await existingCategory.save();

//         res.status(200).json(updatedCategory);
//     } catch (err) {
//         res.status(500).json({ error: err.message, errorFor : "put caregory"});
//     }
// };

