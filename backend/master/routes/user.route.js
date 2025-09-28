import { Router } from "express";
import { UserLogin, UserRegister, UserProfile } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
export const userRouter = Router();
userRouter.post("/user/login", UserLogin)
userRouter.post("/user/register", UserRegister)
userRouter.get("/user/profile", userMiddleware, UserProfile)