import express, { Router } from "express";
import { Post, User } from "../db/db.js";
const postRouter = Router();
postRouter.get("/get-all-posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.json({
            posts
        });
    }
    catch (err) {
        console.error("Error fetching all posts:", err);
        return res.status(500).json({ message: "Failed to fetch posts" });
    }
});
postRouter.post("/newpost", async (req, res) => {
    const userId = req.userId;
    const { content } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const post = await Post.create({
            authorId: user._id,
            authorName: user.name,
            content
        });
        return res.json({
            newPost: post
        });
    }
    catch (err) {
        console.error("Error creating post:", err);
        return res.status(500).json({ message: "Failed to create post" });
    }
});
postRouter.get("/get-user-posts/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const posts = await Post.find({ authorId: userId });
        return res.json({ posts });
    }
    catch (error) {
        console.error("Error fetching user posts:", error);
        return res.status(500).json({ message: "Failed to fetch user posts" });
    }
});
export { postRouter };
//# sourceMappingURL=post.js.map