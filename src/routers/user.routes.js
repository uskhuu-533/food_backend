import { createUser } from "../controller/users/create-user.js";
// import { editUser } from "../controller/users/edit-user.js";
import { deleteUsers } from "../controller/users/delete.user.js";
import { getUser } from "../controller/users/get-user.js";
import express from "express"
import { checkPassword } from "../controller/login/post-login.js";
import { authentication } from "../middleware/user/authentication.js";
import { authenticationJWT } from "../middleware/user/jwt-Auth.js";
import { editUser } from "../controller/users/edit-user.js";
import { getUserAddress } from "../controller/users/getAddress.js";
import { changePassword } from "../controller/users/change-password.js";




export const userRouter = express.Router();

userRouter.get(`/`, authenticationJWT, getUser)
userRouter.post(`/`, authentication, createUser)
userRouter.delete(`/`, deleteUsers);
userRouter.put(`/`, authenticationJWT, editUser)
userRouter.post('/login', checkPassword)
userRouter.get('/address', authenticationJWT, getUserAddress)
userRouter.put('/password', changePassword)
