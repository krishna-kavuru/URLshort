const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const urlRoutes = require("./routes/urlRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/url", urlRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
