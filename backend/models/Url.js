const mongoose = require("mongoose");
const shortid = require("shortid");

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, unique: true, default: shortid.generate },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Url", UrlSchema);
