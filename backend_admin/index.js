const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors");
connectDb();
app.use(cors(
    {
        origin: ["https://element-admin.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.static('/uploads/icons'));

// Admin Panel Routing
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/icon",require("./routes/draftIconRoutes"));
app.use("/api/pack",require("./routes/packRoutes"));
app.use("/api/kit",require("./routes/kitRoutes"));

app.use("/api/user/icon",require("./routes/activeIconLisingRoute"));

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Admin Server is Running...",port);
})