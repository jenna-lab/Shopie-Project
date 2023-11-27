import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/userController";

import { verifyToken } from "../middleware/verifyToken";


// const { tokenVerfying } = require("../Middleware/tokenVerify");

const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/update/:userId", verifyToken, updateUser);

export { userRoute };
