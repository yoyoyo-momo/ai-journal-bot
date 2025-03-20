// import express from "express";
// import User from "../models/User";
// import { protect } from "../middleware/authMiddleware";

// const router = express.Router();

// router.get("/", protect, async (req, res) => {
//     try {
//         const users = await User.find().select("-password");
//         res.json(users);
//     }catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// });

// export default router;