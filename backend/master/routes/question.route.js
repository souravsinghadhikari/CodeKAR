import express from 'express';
const questionRouter = express.Router();

questionRouter.get('/test', (req, res) => {
  res.send('question route works');
});

export {questionRouter}
 