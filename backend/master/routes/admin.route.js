import { Router } from "express";
import { AdminLogin, Adminregister } from "../controllers/admin.controller.js";
export const adminRouter = Router();
adminRouter.post("/login", AdminLogin)
adminRouter.post("/register", Adminregister)