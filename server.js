require("dotenv").config();

const express = require("express");


const app = express();


// Connecting to database.js
require("./config/database");



// Import Routes
const orderRoutes = require("./routes/orderRoutes");

// Middleware
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.send("OMS Server Running");
});

// Health Check
app.get("/health", (req, res) => {
    res.send({
        status: "Healthy"
    });
});


 // Import Routes

app.use("/orders", orderRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 TechMart OMS running on port ${PORT}`);
});