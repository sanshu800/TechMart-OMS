const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((error) => {
        console.log("❌ MongoDB Connection Failed");
        console.error(error);
    });