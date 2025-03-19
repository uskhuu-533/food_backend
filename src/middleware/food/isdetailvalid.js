export const isfoodValid = async (req, res, next) => {
  const { food_description, food_name, price, food_image } = req.body;
  if (food_description && food_name && price && food_image) {
    next();
  }else{
    res.send("required").status(500)
  }
 
};
