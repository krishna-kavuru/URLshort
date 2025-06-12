const express = require("express");
const Url = require("../models/Url");
const router = express.Router();

// ➤ Create a short URL
router.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;

    try {
        let url = await Url.findOne({ originalUrl });

        if (!url) {
            url = new Url({ originalUrl });
            await url.save();
        }

        res.json({ shortUrl: url.shortUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Redirect to original URL
router.get("/:shortUrl", async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });

        if (!url) return res.status(404).json({ error: "URL not found" });

        url.clicks++;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get analytics for a short URL
router.get("/analytics/:shortUrl", async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });

        if (!url) return res.status(404).json({ error: "URL not found" });

        res.json({ originalUrl: url.originalUrl, shortUrl: url.shortUrl, clicks: url.clicks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
