import { Router } from "express";
import {
  createTournament,
  registerForTournament,
  finalizeTournament,
  claimPrize,
} from "../controllers/tournament.controller";

const router = Router();

// Create a new tournament
router.post("/create", createTournament);

// Register for a tournament
router.post("/register", registerForTournament);

// Finalize a tournament
router.post("/finalize", finalizeTournament);

// Claim tournament prize
router.post("/claim-prize", claimPrize);

export default router;
