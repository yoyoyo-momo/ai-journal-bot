const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ["Happy", "Sad", "Angry", "Stressed", "Neutral"],
        default: "Neutral"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Journal", JournalSchema);