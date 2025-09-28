import { Router } from "express";
import { AdminLogin, Adminregister } from "../controllers/admin.controller.js";
export const adminRouter = Router();
adminRouter.post("/admin/login", AdminLogin)
adminRouter.post("/admin/register", Adminregister)