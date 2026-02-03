import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { AddTestcase, DeleteTestcase, GetTestcase, UpdateTestcase } from "../controllers/testcase.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
export const testCaseRouter = Router();
testCaseRouter.post("/testcase", adminMiddleware, AddTestcase);
testCaseRouter.get("/testcase/:id", userMiddleware, GetTestcase);
testCaseRouter.put("/testcase", adminMiddleware, UpdateTestcase);
testCaseRouter.delete("/testcase/:id", adminMiddleware, DeleteTestcase);