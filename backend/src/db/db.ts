import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const MONGO_URL = process.env.MONGO_URL
if(!MONGO_URL){
    throw new Error("MONGO_URL not set in environment variables")
}
mongoose.connect(MONGO_URL)

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    bio : {
        type : String
    }
},{timestamps:true})
const User = mongoose.model("User",userSchema)

const postSchema = new mongoose.Schema({
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    authorName : {
        type : String
    },
    content : {
        type : String
    }
},{timestamps:true})
const Post = mongoose.model("Post",postSchema)
export {User,Post}