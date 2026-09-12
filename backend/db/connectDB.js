import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export default async function conDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}