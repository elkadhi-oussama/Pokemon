console.clear();
const express = require("express");
const app = express();
const connectDB = require("./config/dbConnect");
//require dontenv
require("dotenv").config();
//connect to data base
connectDB();

//routes
app.use(express.json());
app.use("/user", require("./routes/user"))

//server
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`Server Running on ${PORT}`)
);
