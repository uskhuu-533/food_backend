import express from "express";
import { getCategory } from "../controller/categories/get-category.js";
import { postCategory } from "../controller/categories/post-category.js";
import { getAllCategory } from "../controller/categories/get-All-Category.js";

export const categoryRouter = express.Router();

categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", postCategory);
categoryRouter.get('/', getAllCategory)
