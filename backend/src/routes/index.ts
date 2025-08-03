import express from "express"
import {userRouter} from "./user.js"
import {postRouter} from "./post.js"
import authMiddleware from "../middlewares/authMiddleware.js"
const mainRouter = express.Router()

mainRouter.use("/user",userRouter)
mainRouter.use(authMiddleware)
mainRouter.use("/post",postRouter)

export {mainRouter}