const express = require("express");
const cors = require("cors");
const Router = require("../Routes/AllRoutes");
const app = express();
const path = require("path");
// Load environment variables from .env file
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use("/api", Router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
module.exports = app;
