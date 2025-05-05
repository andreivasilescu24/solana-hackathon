import { PublicKey } from "@solana/web3.js";

export interface TokenAllocation {
  mint: PublicKey;
  weight: number;
}

export interface Tournament {
  id: number;
  creator: PublicKey;
  entryFee: number;
  startTime: number;
  endTime: number;
  prizePool: number;
  isFinalized: boolean;
  isClaimed: boolean;
  winner: PublicKey | null;
}

export interface UserPortfolio {
  user: PublicKey;
  tournament: PublicKey;
  weights: TokenAllocation[];
}

export interface TournamentVault {}

export interface PortfolioTournaments {
  version: "0.1.0";
  name: "portfolio_tournaments";
  instructions: {
    createTournament: {
      accounts: {
        creator: PublicKey;
        tournament: PublicKey;
        vault: PublicKey;
        systemProgram: PublicKey;
      };
      args: [number, number, number, number];
    };
    registerUser: {
      accounts: {
        user: PublicKey;
        tournament: PublicKey;
        userPortfolio: PublicKey;
        vault: PublicKey;
        systemProgram: PublicKey;
      };
      args: [TokenAllocation[]];
    };
    finalizeTournament: {
      accounts: {
        tournament: PublicKey;
        creator: PublicKey;
        vault: PublicKey;
        winner: PublicKey;
        systemProgram: PublicKey;
      };
      args: [PublicKey];
    };
    claimPrize: {
      accounts: {
        winner: PublicKey;
        tournament: PublicKey;
        vault: PublicKey;
        systemProgram: PublicKey;
      };
      args: [];
    };
  };
}
