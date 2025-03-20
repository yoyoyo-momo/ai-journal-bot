import express from "express";
import { googleAuth, googleAuthCallback, logoutUser } from "../controllers/authController";
import { IUser } from "../models/User";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/logout", logoutUser);

router.get("/user", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const user = req.user as IUser;
    res.json({
        _id: user._id,
        googleId: user.googleId,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        journals: user.journals || [],
    });
});

export default router;
