import idl from "./portfolio_tournaments.json";
export const IDL = idl;

export type PortfolioTournaments = typeof IDL;

export interface TokenAllocation {
  token: string;
  weight: number;
}

// Account types based on your IDL
export interface TournamentAccount {
  creator: string;
  id: number;
  entryFee: number;
  startTime: number;
  endTime: number;
  maxTokensPerUser: number;
  maxUsers: number;
  currentUsers: number;
  isFinalized: boolean;
  winner: string | null;
  prizePool: number;
}

export interface UserPortfolioAccount {
  tournament: string;
  user: string;
  weights: TokenAllocation[];
  performance: number;
}
