require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Frontend
const path = require("path"); 


// Import Routes
const orderRoutes = require("./routes/orderRoutes");


const app = express();


// Connecting to database.js
require("./config/database");




// Middleware
app.use(express.json());
//Frontend
app.use(express.static(path.join(__dirname, "public")));


app.use("/orders", orderRoutes);



// Health Check
app.get("/health", (req, res) => {
    res.send({
        status: "Healthy"
    });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 TechMart OMS running on port ${PORT}`);
});