import { Router } from "express";
import { UserLogin, UserRegister, UserProfile } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
export const userRouter = Router();
userRouter.post("/login", UserLogin)
userRouter.post("/register", UserRegister)
userRouter.get("/profile", userMiddleware, UserProfile)