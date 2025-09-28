import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { userMiddleware } from "../middleware/user.middleware.js";
import { AddQuestion, DeleteQuestion, EditQuestion, GetQuestions, GetSpcificQuestion } from "../controllers/question.controller.js";
export const questionRouter = Router();
questionRouter.post("/question", adminMiddleware, AddQuestion);
questionRouter.get("/question", userMiddleware, GetQuestions);
questionRouter.get("/question/:id", userMiddleware, GetSpcificQuestion);
questionRouter.put("/question", adminMiddleware, EditQuestion);
questionRouter.delete("/question/:id", adminMiddleware, DeleteQuestion);

// {
//   "question": "001: Implement a function to reverse a string.",
//   "description": "Given a string as input, return the string reversed. You must not use built-in reverse functions. The solution should handle spaces and special characters as well.",
//   "sampleInput1": "hello",
//   "sampleOutput1": "olleh",
//   "sampleInput2": "001 test",
//   "sampleOutput2": "tset 100",
//   "difficulty": "easy"
// }

// {
//     "email": "admin001@gmail.com",
//     "password": "123456"
// }


// {"success":true,"message":"Questions fetched successfully","data":[
//   {"id":"3168c1d2-4dc6-4738-b0c5-722c41b7d209","question":"001: Implement a function to reverse a string.","
// description":"Given a string as input, return the string reversed.
//  You must not use built-in reverse functions. The solution should handle spaces and special characters as well."
// ,"difficulty":"easy","sampleInput1":"hello","sampleInput2":"001 test","sampleOutput1":"olleh","sampleOutput2":"tset 100"},
//   {"id":"c7648e0f-e102-41de-9ea5-a796c5102017","question":"002: Implement a function to reverse a string.","description":
// "Given a string as input, return the string reversed. You must not use built-in reverse functions. 
// The solution should handle spaces and special characters as well.","difficulty":"easy","sampleInput1":"hello",
// "sampleInput2":"002 test","sampleOutput1":"olleh","sampleOutput2":"tset 100"}]}