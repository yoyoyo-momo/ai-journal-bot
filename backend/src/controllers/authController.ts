import { Request, Response } from "express";
import passport from "passport";

export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
});

export const logoutUser = (req: Request, res: Response) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.redirect("http://localhost:3000");
    });
};