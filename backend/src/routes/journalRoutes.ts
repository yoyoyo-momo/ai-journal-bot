import express from "express";
import { createJournal, getJournals } from "../controllers/journalController";
import { ensureAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", (req, res, next) => ensureAuth(req as any, res, next), createJournal);
router.get("/", (req, res, next) => ensureAuth(req as any, res, next), getJournals);

export default router;
