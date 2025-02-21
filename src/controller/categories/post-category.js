import { Category } from "../../models/categories.model.js";

export const postCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if(title){

    const foods = []
    if (title) {
      const result = new Category({title, foods});
      await result.save();
      res.status(200).send("category added");
    } else {
      res.status(400).send("category vaild");
    }
}else{
    res.send("title vaild")
}
  } catch (err) {
    console.log(err);
  }
};
