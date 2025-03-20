import mongoose, {Schema, Document } from "mongoose";

export interface IJournal extends Document {
    googleId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
}

const JournalSchema = new Schema<IJournal>(
    {
        googleId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }
);

const Journal = mongoose.model<IJournal>("Journal", JournalSchema);
export default Journal;