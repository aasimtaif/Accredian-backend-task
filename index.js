import express from 'express';
import { prisma } from "./config/prisma.config.js";
import dotenv from "dotenv";
import cors from 'cors';
import authRoute from './routes/auth.js';
import userRouter from './routes/user.js';
import courceRouter from './routes/course.js';
import ReferralVerificationRouter from './routes/ReferralVerification.js';
import purchaseRouter from './routes/purchase.js';
const app = express();
dotenv.config();

app.use(cors({ credentials: 'true' }))
app.use(express.json());
const connect = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to mysql database.");
    } catch (error) {
        console.log("Error connecting to database.", error);
    }
};
app.use("/api/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/courses", courceRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/referral", ReferralVerificationRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(6800, () => {
    connect();
    console.log("Connected to backend.at port 6800");
});
