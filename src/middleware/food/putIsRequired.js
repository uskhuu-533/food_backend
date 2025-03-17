export const putRequireFood = async (req, res, next) => {
    const {  food_name, food_description, food_image, price } = req.body;
    const {category} = req.params
    console.log(category, food_name, food_description, food_image, price);
    
    if (!category && food_name && food_image && price) {
      res.send("category not found").status(400)
    }else if(!food_description){
        req.send("food_description not found")
    }else if(!food_image){
        res.send("image not found").status(400)
    } else {
        next()
    }
}