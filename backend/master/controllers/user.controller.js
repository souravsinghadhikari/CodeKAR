import { userLoginValidator, userRegisterValidator } from "../validators/user.validator.js";
import {prisma} from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function UserLogin(req, res) {
    try {
        const body = req.body;
        const check = userLoginValidator.safeParse(body);
        console.log(check);

        if (!check.success) {
            return res.status(400).json({
                success: false,
                message: check.error.errors || "Invalid input"
            });
        }

        const user = await prisma.user.findFirst({
            where: { email: check.data.email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const checkPassword = await bcrypt.compare(check.data.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"  
        });

        return res.json({
            success: true,
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function UserRegister(req, res) {
    try {
        const body = req.body;
        const check = userRegisterValidator.safeParse(body);
        console.log("Prisma connected to:", process.env.DATABASE_URL);

        console.log(check);

        if (!check.success) {
            return res.status(400).json({
                success: false,
                message: check.error.errors || "Invalid input"
            });
        }

        const existingUser = await prisma.user.findFirst({
            where: { email: check.data.email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(check.data.password, salt);

        const user = await prisma.user.create({
            data: {
                email: check.data.email,
                password: hashedPassword,
                username: check.data.username
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.json({
            success: true,
            message: "User registered successfully",
            token
        });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function UserProfile(req, res) {
    try {
        const userId = req.body.id;

        console.log(userId);
        const response = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const submissions = await prisma.submissions.findMany({
            where: { userId }
        });

        const correctsubmissions = await prisma.submissions.findMany({
            where: { userId, correct: true }
        });

        const correct = await prisma.submissions.groupBy({
            by: ["questionId"],
            where: { userId, correct: true }
        });

        const activity = await prisma.submissions.groupBy({
            by: ["createdAt"],
            where: {
                userId,
                createdAt: {
                    gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
                }
            }
        });

        const frequencyMap = {};
        activity.forEach(item => {
            const date = item.createdAt.toISOString().split('T')[0];
            frequencyMap[date] = (frequencyMap[date] || 0) + 1;
        });

        const values = Object.entries(frequencyMap).map(([date, count]) => ({ date, count }));

        const recent = await prisma.submissions.findMany({
            where: { userId },
            include: {
                question: { select: { question: true } }
            },
            take: 5,
            orderBy: { createdAt: "desc" }
        });

        return res.json({
            success: true,
            data: {
                profile: response,
                submissions: submissions.length,
                correct: correct.length,
                correctSubmissions: correctsubmissions.length,
                recent,
                values
            }
        });
    } catch (error) {
        console.error("Profile Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

