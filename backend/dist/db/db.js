import mongoose from "mongoose";
mongoose.connect("mongodb+srv://Madhav:y2PuU4wGCqgEoT95@cluster0.axze3.mongodb.net/Ciaan-task");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    }
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
const postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorName: {
        type: String
    },
    content: {
        type: String
    }
}, { timestamps: true });
const Post = mongoose.model("Post", postSchema);
export { User, Post };
//# sourceMappingURL=db.js.map