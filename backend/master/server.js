const express = require('express');
const app = express();
const PORT = 5000;

app.get('/health', (req, res) => {
    res.json({ success: true, message: "Master service is running 🚀" });
});

app.listen(PORT, () => {
    console.log(`Master service running on http://localhost:${PORT}`);
});

