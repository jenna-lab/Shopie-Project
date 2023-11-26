import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/userController";

const { tokenVerfying } = require("../Middleware/tokenVerify");

const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/update/:userId", tokenVerfying, updateUser);

export { userRoute };
