import { Request, Response } from "express";
import Journal from "../models/Journal";
import { IUser } from "../models/User";

export const createJournal = async (req: Request, res: Response) =>{
    try {
        const user = req.user as IUser;

        if (!user || !user.googleId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const { title, content } = req.body;
        const newJournal = new Journal({ user: user.googleId, title, content });
        await newJournal.save();
        res.status(201).json(newJournal);
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

        const journals = await Journal.find({ user: user.googleId });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch journals" });
    }
}