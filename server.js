require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Weather database schema
const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    temperature: Number,
    humidity: Number,
    status: String,
    wind: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create Weather model
const Weather = mongoose.model("Weather", weatherSchema);

// Display website
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Save weather data to MongoDB
app.post("/weather/update", async (req, res) => {
    try {
        const report = await Weather.create(req.body);

        res.status(201).json({
            message: "Weather data saved successfully",
            data: report
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not save weather data",
            error: error.message
        });
    }
});

// Get latest weather data
app.get("/weather/now", async (req, res) => {
    try {
        const latest = await Weather.findOne()
            .sort({ timestamp: -1 });

        if (!latest) {
            return res.status(404).json({
                message: "No weather data available"
            });
        }

        res.json(latest);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wss")
    .then(() => {

        console.log("MongoDB Compass connected successfully");

        const PORT = 3000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    })
    .catch((error) => {

        console.log("MongoDB connection error:", error.message);

    });
