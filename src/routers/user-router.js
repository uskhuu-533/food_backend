import { createUser } from "../controller/users/create-user.js";
// import { editUser } from "../controller/users/edit-user.js";
import { deleteUsers } from "../controller/users/delete.user.js";
import { getUser } from "../controller/users/get-user.js";
import express from "express"
import { checkPassword } from "../controller/login/get-login.js";
import { authentication } from "../middleware/food/user/authentication.js";



export const userRouter = express.Router();

userRouter.get(`/`, getUser)
userRouter.post(`/`, authentication, createUser)
// userRouter.put(`/`, editUser);
userRouter.delete(`/`, deleteUsers);
userRouter.post('/login', checkPassword)
