import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { PortfolioTournaments } from "./portfolio-tournaments";

export interface ProgramWallet {
  publicKey: PublicKey;
  signTransaction: any;
  signAllTransactions: any;
}

export type PortfolioTournamentsProgram = Program<PortfolioTournaments>;
