require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Request = require("./models/Request");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Campus Facility Portal API is running"
  });
});

app.post("/api/requests", async (req, res) => {
  try {
    const { name, department, facility, description } = req.body;

    if (
      !name?.trim() ||
      !department?.trim() ||
      !facility ||
      !description?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill in all fields"
      });
    }

    const savedRequest = await new Request({
      name,
      department,
      facility,
      description
    }).save();

    res.status(201).json({
      message: "Facility request saved successfully!",
      record: savedRequest
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save request",
      error: error.message
    });
  }
});

app.get("/api/requests", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve requests",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });