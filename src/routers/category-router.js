import express from "express"
import { getCategory } from "../controller/categories/get-category.js"
import { postCategory } from "../controller/categories/post-category.js"
import { putCategory } from "../controller/categories/put-category.js"







export const categoryRouter = express.Router()


categoryRouter.get('/', getCategory)
categoryRouter.post('/', postCategory)
categoryRouter.put('/', putCategory )
