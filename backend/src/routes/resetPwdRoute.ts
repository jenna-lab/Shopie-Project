import { Router } from "express";
import { resetPassword, resetRequest } from "../controllers/userController";

const resetRoute = Router();

resetRoute.post("/reset-password", resetRequest);

resetRoute.post("/reset-password/:token", resetPassword);

export { resetRoute };
