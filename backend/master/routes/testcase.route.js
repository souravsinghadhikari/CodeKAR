import express from 'express';
const testCaseRouter = express.Router();

testCaseRouter.get('/test', (req, res) => {
  res.send('Admin route works');
});

export {testCaseRouter}
 