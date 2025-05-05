import { Request, Response } from "express";
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { getProgram } from "../utils/program";
import {
  CreateTournamentDto,
  RegisterTournamentDto,
  Tournament,
  TokenAllocation,
} from "../types/tournament.types";

// Helper function to get creator keypair from environment
const getCreatorKeypair = (): Keypair => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY not found in environment variables");
  }

  // Convert string of numbers to Uint8Array
  const secretKey = Uint8Array.from(
    process.env.SECRET_KEY.split(",").map((num) => parseInt(num))
  );

  return Keypair.fromSecretKey(secretKey);
};

// Helper function to find platform authority PDA
const findPlatformAuthorityPDA = (
  programId: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("platform-authority")],
    programId
  );
};

// Helper function to find tournament PDA
const findTournamentPDA = (
  creator: PublicKey,
  id: anchor.BN,
  programId: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("tournament"),
      creator.toBuffer(),
      id.toArrayLike(Buffer, "le", 8),
    ],
    programId
  );
};

// Helper function to find vault PDA
const findVaultPDA = (
  tournamentPDA: PublicKey,
  programId: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), tournamentPDA.toBuffer()],
    programId
  );
};

// Helper function to find user portfolio PDA
const findUserPortfolioPDA = (
  tournamentPDA: PublicKey,
  userPubkey: PublicKey,
  programId: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_portfolio"),
      tournamentPDA.toBuffer(),
      userPubkey.toBuffer(),
    ],
    programId
  );
};

export const initializePlatform = async (req: Request, res: Response) => {
  try {
    const creatorKeypair = getCreatorKeypair();

    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "http://localhost:8899",
      "confirmed"
    );

    // Create wallet interface from keypair
    const wallet = {
      publicKey: creatorKeypair.publicKey,
      signTransaction: (tx: any) =>
        Promise.resolve(tx.partialSign(creatorKeypair)),
      signAllTransactions: (txs: any[]) =>
        Promise.all(
          txs.map((tx) => {
            tx.partialSign(creatorKeypair);
            return Promise.resolve(tx);
          })
        ),
    };

    const program = getProgram(connection, wallet);
    const [platformAuthorityPDA] = findPlatformAuthorityPDA(program.programId);

    const tx = await program.methods
      .initPlatform()
      .accountsPartial({
        platformAuthority: platformAuthorityPDA,
        authority: creatorKeypair.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    res.status(201).json({
      message: "Platform initialized successfully",
      platformAuthorityPDA: platformAuthorityPDA.toString(),
      transactionId: tx,
    });
  } catch (error) {
    console.error("Error initializing platform:", error);
    res.status(500).json({ error: "Failed to initialize platform" });
  }
};

export const createTournament = async (req: Request, res: Response) => {
  try {
    console.log("1. Request body:", JSON.stringify(req.body, null, 2));
    const tournamentData: CreateTournamentDto = req.body;

    // Convert timestamps to milliseconds if they're in seconds
    const startTimestamp =
      tournamentData.startTimestamp < 1e10
        ? tournamentData.startTimestamp * 1000
        : tournamentData.startTimestamp;

    const endTimestamp =
      tournamentData.endTimestamp < 1e10
        ? tournamentData.endTimestamp * 1000
        : tournamentData.endTimestamp;

    // Validate tournament data
    if (startTimestamp <= Date.now()) {
      return res
        .status(400)
        .json({ error: "Start timestamp must be in the future" });
    }

    if (endTimestamp <= startTimestamp) {
      return res
        .status(400)
        .json({ error: "End timestamp must be after start timestamp" });
    }

    // Convert timestamps to BN
    const id = new anchor.BN(Date.now()); // Unique ID for the tournament
    const entryFee = new anchor.BN(tournamentData.entryFee);
    const startTime = new anchor.BN(Math.floor(startTimestamp / 1000));
    const endTime = new anchor.BN(Math.floor(endTimestamp / 1000));

    console.log("2. Converted values:", {
      id: id.toString(),
      entryFee: entryFee.toString(),
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      maxTokensPerPortfolio: tournamentData.maxTokensPerPortfolio,
      maxUsers: tournamentData.maxUsers,
    });

    const creatorKeypair = getCreatorKeypair();
    console.log("3. Creator public key:", creatorKeypair.publicKey.toString());

    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "http://localhost:8899",
      "confirmed"
    );

    // Create wallet interface from keypair
    const wallet = {
      publicKey: creatorKeypair.publicKey,
      signTransaction: (tx: any) =>
        Promise.resolve(tx.partialSign(creatorKeypair)),
      signAllTransactions: (txs: any[]) =>
        Promise.all(
          txs.map((tx) => {
            tx.partialSign(creatorKeypair);
            return Promise.resolve(tx);
          })
        ),
    };

    const program = getProgram(connection, wallet);
    console.log("4. Program ID:", program.programId.toString());

    // Find PDAs
    const [platformAuthorityPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("platform-authority")],
      program.programId
    );

    // Initialize platform if not already initialized
    try {
      await program.methods
        .initPlatform()
        .accountsPartial({
          platformAuthority: platformAuthorityPDA,
          authority: creatorKeypair.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log("Platform initialized");
    } catch (error) {
      console.log("Platform already initialized or error:", error);
      // Continue even if platform is already initialized
    }

    const [tournamentPDA] = findTournamentPDA(
      creatorKeypair.publicKey,
      id,
      program.programId
    );
    const [vaultPDA] = findVaultPDA(tournamentPDA, program.programId);
    const [creatorPortfolioPDA] = findUserPortfolioPDA(
      tournamentPDA,
      creatorKeypair.publicKey,
      program.programId
    );

    console.log("5. PDAs:", {
      tournamentPDA: tournamentPDA.toString(),
      vaultPDA: vaultPDA.toString(),
      creatorPortfolioPDA: creatorPortfolioPDA.toString(),
    });

    // Convert portfolio weights
    const weights = tournamentData.creatorPortfolio.tokenAllocations.map(
      (allocation): TokenAllocation => ({
        mint: new PublicKey(allocation.mint),
        weight: allocation.weight,
      })
    );

    console.log(
      "6. Portfolio weights:",
      weights.map((w) => ({
        mint: w.mint.toString(),
        weight: w.weight,
      }))
    );

    // Create tournament
    console.log("7. Creating tournament with accounts:", {
      creator: creatorKeypair.publicKey.toString(),
      tournament: tournamentPDA.toString(),
      vault: vaultPDA.toString(),
      creatorPortfolio: creatorPortfolioPDA.toString(),
      systemProgram: SystemProgram.programId.toString(),
    });

    const tx = await program.methods
      .createTournament(
        id,
        entryFee,
        startTime,
        endTime,
        tournamentData.maxTokensPerPortfolio,
        tournamentData.maxUsers,
        weights
      )
      .accounts({
        creator: creatorKeypair.publicKey,
        tournament: tournamentPDA,
        vault: vaultPDA,
        creatorPortfolio: creatorPortfolioPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([creatorKeypair])
      .rpc();

    console.log("8. Transaction successful:", tx);

    res.status(201).json({
      message: "Tournament created successfully",
      tournamentPDA: tournamentPDA.toString(),
      vaultPDA: vaultPDA.toString(),
      creatorPortfolioPDA: creatorPortfolioPDA.toString(),
      transactionId: tx,
    });
  } catch (error) {
    console.error("Error creating tournament:", error);
    res.status(500).json({ error: "Failed to create tournament" });
  }
};

export const registerForTournament = async (req: Request, res: Response) => {
  try {
    const registrationData: RegisterTournamentDto = req.body;

    // Convert addresses to PublicKeys
    const userPubkey = new PublicKey(registrationData.userAddress);
    const tournamentPDA = new PublicKey(registrationData.tournamentPdaAddress);

    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "http://localhost:8899"
    );
    const program = getProgram(connection, {
      publicKey: userPubkey,
      signTransaction: req.body.signTransaction,
      signAllTransactions: req.body.signAllTransactions,
    });

    // Find PDAs
    const [userPortfolioPDA] = findUserPortfolioPDA(
      tournamentPDA,
      userPubkey,
      program.programId
    );
    const [vaultPDA] = findVaultPDA(tournamentPDA, program.programId);

    // Convert portfolio weights
    const weights = registrationData.portfolio.tokenAllocations.map(
      (allocation): TokenAllocation => ({
        mint: new PublicKey(allocation.mint),
        weight: allocation.weight,
      })
    );

    // Register user
    const tx = await program.methods
      .registerUser(weights)
      .accountsPartial({
        user: userPubkey,
        tournament: tournamentPDA,
        userPortfolio: userPortfolioPDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    res.json({
      message: "Successfully registered for tournament",
      userPortfolioPDA: userPortfolioPDA.toString(),
      vaultPDA: vaultPDA.toString(),
      transactionId: tx,
    });
  } catch (error) {
    console.error("Error registering for tournament:", error);
    res.status(500).json({ error: "Failed to register for tournament" });
  }
};

export const finalizeTournament = async (req: Request, res: Response) => {
  try {
    const { tournamentPdaAddress, winnerAddress } = req.body;

    const creatorKeypair = getCreatorKeypair();
    const tournamentPDA = new PublicKey(tournamentPdaAddress);
    const winnerPubkey = new PublicKey(winnerAddress);

    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "http://localhost:8899"
    );

    // Create wallet interface from keypair
    const wallet = {
      publicKey: creatorKeypair.publicKey,
      signTransaction: (tx: any) =>
        Promise.resolve(tx.partialSign(creatorKeypair)),
      signAllTransactions: (txs: any[]) =>
        Promise.all(
          txs.map((tx) => {
            tx.partialSign(creatorKeypair);
            return Promise.resolve(tx);
          })
        ),
    };

    const program = getProgram(connection, wallet);

    const [vaultPDA] = findVaultPDA(tournamentPDA, program.programId);

    // Finalize tournament
    const tx = await program.methods
      .finalizeTournament(winnerPubkey)
      .accountsPartial({
        tournament: tournamentPDA,
        creator: creatorKeypair.publicKey,
        vault: vaultPDA,
        winner: winnerPubkey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    res.json({
      message: "Tournament finalized successfully",
      transactionId: tx,
    });
  } catch (error) {
    console.error("Error finalizing tournament:", error);
    res.status(500).json({ error: "Failed to finalize tournament" });
  }
};

export const claimPrize = async (req: Request, res: Response) => {
  try {
    const { tournamentPdaAddress, winnerAddress } = req.body;

    const tournamentPDA = new PublicKey(tournamentPdaAddress);
    const winnerPubkey = new PublicKey(winnerAddress);

    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "http://localhost:8899"
    );
    const program = getProgram(connection, {
      publicKey: winnerPubkey,
      signTransaction: req.body.signTransaction,
      signAllTransactions: req.body.signAllTransactions,
    });

    const [vaultPDA] = findVaultPDA(tournamentPDA, program.programId);

    // Claim prize
    const tx = await program.methods
      .claimPrize()
      .accountsPartial({
        winner: winnerPubkey,
        tournament: tournamentPDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    res.json({
      message: "Prize claimed successfully",
      transactionId: tx,
    });
  } catch (error) {
    console.error("Error claiming prize:", error);
    res.status(500).json({ error: "Failed to claim prize" });
  }
};
