import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: IUser & {
        googleId: string;
    };
}

export const ensureAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.googleId) { 
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
