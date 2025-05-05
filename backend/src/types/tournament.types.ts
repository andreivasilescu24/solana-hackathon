import { PublicKey } from "@solana/web3.js";

export interface TokenAllocation {
  mint: PublicKey;
  weight: number;
}

export interface Portfolio {
  userAddress: string;
  tokenAllocations: {
    mint: string;
    weight: number;
  }[];
}

export interface CreateTournamentDto {
  startTimestamp: number;
  endTimestamp: number;
  maxUsers: number;
  maxTokensPerPortfolio: number;
  entryFee: number;
  creatorPortfolio: Portfolio;
}

export interface RegisterTournamentDto {
  userAddress: string;
  tournamentPdaAddress: string;
  portfolio: Portfolio;
}

export interface Tournament {
  pdaAddress: string;
  startTimestamp: number;
  endTimestamp: number;
  maxUsers: number;
  maxTokensPerPortfolio: number;
  entryFee: number;
  registeredUsers: Portfolio[];
  status: "PENDING" | "ACTIVE" | "COMPLETED";
  winner?: string;
}
