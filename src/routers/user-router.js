import { createUser } from "../controller/users/create-user.js";
// import { editUser } from "../controller/users/edit-user.js";
import { deleteUsers } from "../controller/users/delete.user.js";
import { getUser } from "../controller/users/get-user.js";
import express from "express"
import { checkPassword } from "../controller/login/post-login.js";
import { authentication } from "../middleware/user/authentication.js";




export const userRouter = express.Router();

userRouter.get(`/`, getUser)
userRouter.post(`/`, authentication, createUser)
userRouter.delete(`/`, deleteUsers);
userRouter.post('/login', checkPassword)
