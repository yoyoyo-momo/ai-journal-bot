import mongoose, { Document } from "mongoose";


interface IJournal {
    _id: mongoose.Types.ObjectId;
    title?: string;
    content: string;
    createdAt: Date;
}

export interface IUser extends Document {
    googleId: string;
    username: string;
    email: string;
    avatar: string;
    journals: IJournal[];
}

const JournalSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    title: { type: String, required: false },
    content: { type: String, required: true },
    createdAt: {type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
    {
        googleId: {type: String, required: true, unique: true },
        username: {type: String, required: true },
        email: {type: String, required: true, unique: true },
        avatar: {type: String },
        journals: [JournalSchema],
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);