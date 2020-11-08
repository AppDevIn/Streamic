const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();



//Set up express

const app = express();
app.use(cors());
app.use(express.json());

const PORT = proceess.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started at port :${PORT}'));


//Setup mongoose

mongoose.connect(process,env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true} , err => {
if(err) return console.log(err);
console.log("MongoDB connection established")

})
