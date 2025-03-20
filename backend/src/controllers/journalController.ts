import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const createJournal = async (req: AuthenticatedRequest, res: Response) =>{
    try {
        const googleId = req.user?.googleId;

        if (!googleId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const user = await User.findOne({ googleId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newEntry = {
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title || "Untitled",
            content: req.body.content,
            createdAt: new Date(),
        }

        user.journals.push(newEntry);
        await user.save();
        
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ message: "Failed to create journal" });
    }
};

export const getJournals = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        
        if (!user || !user.googleId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        res.json(user.journals);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch journals" });
    }
}

export const getJournalById = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        
        if (!user || !user.googleId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const journal = user.journals.find(entry => entry._id.toString() === req.params.id);
        if (!journal) return res.status(404).json({ message: "Journal not found" });

        res.json(journal);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteJournal = async (req: Request, res: Response) => {
    try {
        const { journalId } = req.params;
        console.log("Deleting journal entry:", journalId);

        if (!journalId) {
            console.log("No journal ID received");
            return res.status(400).json({ message: "Invalid journal ID" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { "journals._id": journalId },
            { $pull: { journals: { _id: journalId } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Journal entry deleted", journalId });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};