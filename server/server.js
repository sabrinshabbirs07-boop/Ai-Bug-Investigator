const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Health Check Route
app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "AI Bug Investigator Backend is running 🚀"
    });
});


// Server Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});