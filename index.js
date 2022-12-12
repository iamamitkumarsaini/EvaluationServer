const express = require("express");
require("dotenv").config()

const { connection } = require("./config/db");
const { auth } = require("./middlewares/auth.middleware");
const { todoRoutes } = require("./Routes/Todo.routes");
const { userRoutes } = require("./Routes/user.routes");


const app = express();

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Welcome to Home Page")
})

app.use("/", userRoutes)


app.use(auth)
app.use("/todos",todoRoutes)



app.listen(process.env.port, async() => {

    try {
        await connection;
        console.log("Connected to DB")
    } 
    
    catch (err) {
        console.log("error while connecting to DB")
        console.log(err)
    }

    console.log(`Listening on port ${process.env.port}`)
})