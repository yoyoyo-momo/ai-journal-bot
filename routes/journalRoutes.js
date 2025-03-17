const express = require("express");
const Journal = require("../models/Journal");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {userId, entry, mood} = req.body;
        const newEntry = new Journal({ userId, entry, mood });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const entries = await Journal.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;