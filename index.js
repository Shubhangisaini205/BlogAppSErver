const express = require("express");
const { UserRouter } = require("./route/User.routes");
const { connection } = require("./config/db");
const cors = require("cors");
const { BlogRouter } = require("./route/Blog.router");
const app = express();
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("OKAY")
})

app.use("/user",UserRouter)
app.use("/blog",BlogRouter)


app.listen(8080, async()=>{
    try {
         await connection
         console.log("connected to Db!!")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})