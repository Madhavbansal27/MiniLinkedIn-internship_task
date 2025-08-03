import express from "express"
import cors from "cors"
import {mainRouter} from "./routes/index.js"
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api",mainRouter)

app.listen(PORT,()=>{
    console.log("server started at port 3000")
})