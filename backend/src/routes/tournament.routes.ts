import { Router } from "express";
import {
  getTournaments,
  createTournament,
  registerForTournament,
} from "../controllers/tournament.controller";

const router = Router();

// Get all tournaments
router.get("/", getTournaments);

// Create a new tournament
router.post("/create", createTournament);

// Register for a tournament
router.post("/register", registerForTournament);

export default router;
