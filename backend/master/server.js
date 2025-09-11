const express = require('express');
const app = express();
const PORT = 5000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send("changed  detected ?")
});

app.listen(PORT, () => {
    console.log(`Master service running on http://localhost:${PORT}`);
});

