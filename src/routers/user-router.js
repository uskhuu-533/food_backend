import { createUser } from "../controller/users/create-user.js";
// import { editUser } from "../controller/users/edit-user.js";
import { deleteUsers } from "../controller/users/delete.user.js";
import { getUser } from "../controller/users/get-user.js";
import express from "express"
import { checkPassword } from "../controller/login/post-login.js";
import { authentication } from "../middleware/user/authentication.js";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";




export const userRouter = express.Router();

userRouter.get(`/`, authenticationJWT, getUser)
userRouter.post(`/`, authentication, createUser)
userRouter.delete(`/`, deleteUsers);
userRouter.post('/login', checkPassword)
