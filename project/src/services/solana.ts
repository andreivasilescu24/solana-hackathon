import {
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { IDL, PortfolioTournaments } from "../idl/portfolio_tournaments";
import { useAuth } from "../contexts/AuthContext";

// Program ID from .env
const PROGRAM_ID = new PublicKey(
  process.env.CONTRACT_ADDRESS || "9aQyw4VwZHRYH7Hu6QENQbeB8MQ3t9skfjCWqKvUGkpX"
);

// Devnet connection
const connection = new Connection("https://api.devnet.solana.com");

export interface TournamentData {
  name: string;
  description: string;
  entryFee: number;
  startTime: number;
  endTime: number;
  maxUsers: number;
  maxTokensPerUser: number;
  portfolio: Array<{
    token: string;
    weight: number;
  }>;
}

// Extend the User type to include wallet
interface ExtendedUser {
  id?: string;
  wallet?: anchor.Wallet;
}

export class SolanaService {
  private connection: Connection;
  private program: Program<PortfolioTournaments>;
  private provider: anchor.AnchorProvider;

  constructor(provider: anchor.AnchorProvider) {
    this.connection = connection;
    this.provider = provider;
    this.program = new Program<PortfolioTournaments>(
      IDL as PortfolioTournaments,
      PROGRAM_ID,
      provider
    );
  }

  static async initialize(wallet: anchor.Wallet): Promise<SolanaService> {
    const provider = new anchor.AnchorProvider(connection, wallet, {
      commitment: "processed",
    });
    return new SolanaService(provider);
  }

  async createTournament(data: TournamentData): Promise<string> {
    try {
      // Convert entry fee to lamports
      const entryFeeLamports = data.entryFee * LAMPORTS_PER_SOL;

      // Generate a unique tournament ID
      const tournamentId = Date.now();

      // Find PDA for tournament account
      const [tournamentPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("tournament"),
          this.provider.publicKey.toBuffer(),
          new anchor.BN(tournamentId).toArrayLike(Buffer, "le", 8),
        ],
        this.program.programId
      );

      // Find PDA for vault
      const [vaultPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), tournamentPDA.toBuffer()],
        this.program.programId
      );

      // Find PDA for creator's portfolio
      const [creatorPortfolioPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("user_portfolio"),
          tournamentPDA.toBuffer(),
          this.provider.publicKey.toBuffer(),
        ],
        this.program.programId
      );

      // Create the tournament
      const tx = await this.program.methods
        .createTournament(
          new anchor.BN(tournamentId),
          new anchor.BN(entryFeeLamports),
          new anchor.BN(data.startTime),
          new anchor.BN(data.endTime),
          data.maxTokensPerUser,
          data.maxUsers,
          data.portfolio.map((p) => ({ token: p.token, weight: p.weight }))
        )
        .accounts({
          creator: this.provider.publicKey,
          tournament: tournamentPDA,
          vault: vaultPDA,
          creatorPortfolio: creatorPortfolioPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error("Error creating tournament:", error);
      throw error;
    }
  }
}

// Hook to use Solana service
export const useSolanaService = () => {
  const { user } = useAuth();

  const initializeSolanaService = async () => {
    const extendedUser = user as ExtendedUser;
    if (!extendedUser?.wallet) {
      throw new Error("No wallet connected");
    }
    return await SolanaService.initialize(extendedUser.wallet);
  };

  return {
    initializeSolanaService,
  };
};
