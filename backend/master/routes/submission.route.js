import express from 'express';
const submissionRouter = express.Router();

submissionRouter.get('/test', (req, res) => {
  res.send('Admin route works');
});

export {submissionRouter}
 