import { Foods } from "../../models/foods.model.js";
import { Category } from "../../models/categories.model.js";

export const postFood = async (req, res) => {
    const {food_description, food_name, price, food_image, category} = req.body;
    try {

        const newfood = new Foods({food_description, food_name, price, food_image, category})
         await newfood.save();  
        res.status(200).send(`food added: ${newfood}`)
    } catch (error) {
        console.log(error);
    }
}
// import { Category } from "../../models/categories.model.js";

// export const postFood = async (req, res) => {
//    const {category} = req.params
//  console.log(category);
 
//     const { food_description, food_name, price, food_image} = req.body;


//     try {

//         const existingCategory = await Category.findOne({category});
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