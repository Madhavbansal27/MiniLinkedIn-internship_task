import express, { response, Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Post } from "../db/db.js";
import authMiddleware from "../middlewares/authMiddleware.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
}
const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing_user = await User.findOne({ email });
        if (existing_user) {
            return res.status(400).json({
                message: "Email is already taken"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        const token = jwt.sign({
            userId: newUser._id
        }, JWT_SECRET);
        return res.status(200).json({
            message: "user created successfully",
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                bio: newUser.bio,
                createdAt: newUser.createdAt
            }
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Provided email does not exist"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "invalid password"
            });
        }
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        return res.status(201).json({
            message: "login successfull",
            token: token,
            user: {
                name: user.name,
                bio: user.bio,
                email: user.email,
                id: user._id,
                createdAt: user.createdAt
            }
        });
    }
    catch (err) {
        console.error("Signin error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
userRouter.put("/profile-setup", authMiddleware, async (req, res) => {
    const { name, bio } = req.body;
    const userId = req.userId;
    // Basic validation
    if (!name || !bio) {
        return res.status(400).json({ message: "Name and bio are required" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, bio }, { new: true } // return updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        await Post.updateMany({ authorId: userId }, { $set: { authorName: updatedUser.name } });
        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                bio: updatedUser.bio,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt
            },
        });
    }
    catch (err) {
        console.error("Profile setup error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
userRouter.get("/getProfile/:userId", authMiddleware, async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ message: "user not found" });
        }
        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio
            }
        });
    }
    catch (err) {
        console.error("Profile fetch error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export { userRouter };
//# sourceMappingURL=user.js.map