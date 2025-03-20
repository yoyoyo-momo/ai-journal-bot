import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    googleId: string;
    username: string;
    email: string;
    avatar: string;
}

const UserSchema = new mongoose.Schema(
    {
        googleId: {type: String, required: true, unique: true },
        username: {type: String, required: true },
        email: {type: String, required: true, unique: true },
        avatar: {type: String },
    }
);

export default mongoose.model<IUser>("User", UserSchema);