import express from 'express';
const adminRouter = express.Router();

adminRouter.get('/test', (req, res) => {
  res.send('Admin route works');
});

export {adminRouter}
 