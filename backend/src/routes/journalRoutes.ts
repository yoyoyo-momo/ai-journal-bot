import express from "express";
import { createJournal, getJournals, getJournalById, deleteJournal } from "../controllers/journalController";
import { ensureAuth, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", ensureAuth, (req: AuthenticatedRequest, res: express.Response) => createJournal(req, res));
router.get("/", ensureAuth, (req: AuthenticatedRequest, res: express.Response) => getJournals(req, res));
router.get("/:id", ensureAuth, (req: AuthenticatedRequest, res: express.Response) => getJournalById(req, res));
router.delete("/:journalId", ensureAuth, (req: AuthenticatedRequest, res: express.Response) => deleteJournal(req, res));

export default router;
