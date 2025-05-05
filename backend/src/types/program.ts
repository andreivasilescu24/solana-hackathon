import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PortfolioTournaments } from "../types/portfolio-tournaments";

export interface ProgramWallet {
  publicKey: PublicKey;
  signTransaction: any;
  signAllTransactions: any;
}

export type PortfolioTournamentsProgram = Program<PortfolioTournaments>;
