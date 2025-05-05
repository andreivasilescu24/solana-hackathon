import { Request, Response } from "express";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import {
  CreateTournamentDto,
  RegisterTournamentDto,
  Tournament,
} from "../types/tournament.types";

// Initialize connection and program ID
const connection = new Connection(
  process.env.SOLANA_RPC_URL || "http://localhost:8899"
);

// Using the program ID from portfolio-tournaments
const PROGRAM_ID = new PublicKey(
  "7xaAXMNqwo3wCmTawLKchSbwZJchTkcnFxb1nLHnbg4u"
);

// Helper function to find tournament PDA
const findTournamentPDA = (
  creator: PublicKey,
  id: number
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("tournament"),
      creator.toBuffer(),
      new Uint8Array(new anchor.BN(id).toArray("le", 8)),
    ],
    PROGRAM_ID
  );
};

// Helper function to find vault PDA
const findVaultPDA = (tournamentPDA: PublicKey): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), tournamentPDA.toBuffer()],
    PROGRAM_ID
  );
};

// Helper function to find user portfolio PDA
const findUserPortfolioPDA = (
  tournamentPDA: PublicKey,
  userPubkey: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_portfolio"),
      tournamentPDA.toBuffer(),
      userPubkey.toBuffer(),
    ],
    PROGRAM_ID
  );
};

export const getTournaments = async (req: Request, res: Response) => {
  try {
    // TODO: Implement fetching tournaments from the program
    // This will require either:
    // 1. Maintaining a separate database of tournament IDs
    // 2. Using getProgramAccounts to fetch all tournament accounts
    const tournaments: Tournament[] = [];
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
};

export const createTournament = async (req: Request, res: Response) => {
  try {
    const tournamentData: CreateTournamentDto = req.body;

    // Validate tournament data
    if (tournamentData.startTimestamp <= Date.now()) {
      return res
        .status(400)
        .json({ error: "Start timestamp must be in the future" });
    }

    if (tournamentData.endTimestamp <= tournamentData.startTimestamp) {
      return res
        .status(400)
        .json({ error: "End timestamp must be after start timestamp" });
    }

    // Get the creator's public key from the request
    // This should come from your authentication middleware
    const creatorPubkey = new PublicKey(
      tournamentData.creatorPortfolio.userAddress
    );

    // Generate a unique tournament ID (you might want to implement a better system)
    const tournamentId = Date.now();

    // Find PDAs
    const [tournamentPDA] = findTournamentPDA(creatorPubkey, tournamentId);
    const [vaultPDA] = findVaultPDA(tournamentPDA);

    // TODO: Call the program's create_tournament instruction
    // This will require:
    // 1. Setting up the program provider
    // 2. Creating the transaction
    // 3. Getting the creator's signature

    res.status(201).json({
      message: "Tournament created successfully",
      tournamentPDA: tournamentPDA.toString(),
      vaultPDA: vaultPDA.toString(),
    });
  } catch (error) {
    console.error("Error creating tournament:", error);
    res.status(500).json({ error: "Failed to create tournament" });
  }
};

export const registerForTournament = async (req: Request, res: Response) => {
  try {
    const registrationData: RegisterTournamentDto = req.body;

    // Convert string addresses to PublicKeys
    const userPubkey = new PublicKey(registrationData.userAddress);
    const tournamentPDA = new PublicKey(registrationData.tournamentPdaAddress);

    // Find PDAs
    const [userPortfolioPDA] = findUserPortfolioPDA(tournamentPDA, userPubkey);
    const [vaultPDA] = findVaultPDA(tournamentPDA);

    // TODO: Call the program's register_user instruction
    // This will require:
    // 1. Setting up the program provider
    // 2. Creating the transaction with the correct accounts
    // 3. Getting the user's signature

    res.json({
      message: "Successfully registered for tournament",
      userPortfolioPDA: userPortfolioPDA.toString(),
      vaultPDA: vaultPDA.toString(),
    });
  } catch (error) {
    console.error("Error registering for tournament:", error);
    res.status(500).json({ error: "Failed to register for tournament" });
  }
};

export const finalizeTournament = async (tournamentPdaAddress: string) => {
  try {
    const tournamentPDA = new PublicKey(tournamentPdaAddress);
    const [vaultPDA] = findVaultPDA(tournamentPDA);

    // TODO: Implement PNL calculation logic
    // TODO: Call the program's finalize_tournament instruction with the winner

    console.log(`Tournament ${tournamentPdaAddress} finalized successfully`);
    return true;
  } catch (error) {
    console.error("Error finalizing tournament:", error);
    return false;
  }
};
