export const isfoodValid = async (req, res, next) => {
  const { food_description, food_name, price, food_image, category } = req.body;
  if (food_description && food_name && price && food_image && category) {
    next();
  }
};
