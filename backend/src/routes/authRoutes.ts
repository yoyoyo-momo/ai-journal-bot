import express from "express";
import { googleAuth, googleAuthCallback, logoutUser } from "../controllers/authController";
import { IUser } from "../models/User";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/logout", logoutUser);

router.get("/user", (req, res) => {
    const user = req.user as IUser;
    if (user && user.googleId) {
        res.json({
            googleId: user.googleId,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

export default router;
