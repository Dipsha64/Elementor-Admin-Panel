const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb();

app.use("/api/auth",require("./routes/authRoutes"));

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Admin Server is Running...",port);
})