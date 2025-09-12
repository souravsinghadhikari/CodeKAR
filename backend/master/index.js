import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import questionRouter from './routes/question.route.js';
import submissionRouter from './routes/submission.route.js';
import testCaseRouter from './routes/testcase.route.js';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables from .env

const app = express();

// Middleware
app.use(cors({}));  // will fix it during production

app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy'
    });
});

// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/submissions', submissionRouter);
app.use('/api/v1/testcases', testCaseRouter);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

