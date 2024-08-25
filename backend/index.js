const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const cookieparser = require("cookie-parser");
require("dotenv").config();

const app = express();

const userRoutes = require("./routes/userRoutes");

// middlewares

 app.use(cors({
   origin: "https://private-tasks-client.onrender.com", 
   credentials: true,
 }))


app.use(express.json());

//  port
const port = process.env.PORT;

//  all routess

app.use("/api/v1", userRoutes);



app.get("/", (req,res)=>{
   res.send("<h1>hey there sai sirimarthi??</h1>")
})

app.listen(port , ()=>{
   console.log("server is running 7070")
});

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("atlas DB CONNects"))
.catch(()=> console.log("network || DB connection error "))
