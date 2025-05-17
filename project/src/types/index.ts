export interface TokenAllocation {
  mint: string;
  weight: number;
  name?: string;
  price?: number;
  change24h?: number;
  color?: string;
}

export interface Tournament {
  id: string;
  name?: string;
  description?: string;
  creator: string;
  entryFee: number;
  startTime: number;
  endTime: number;
  prizePool: number;
  isFinalized: boolean;
  isClaimed: boolean;
  winner: string | null;
  maxTokensPerUser: number;
  maxUsers: number;
  currentUsers: number;
}

export interface UserPortfolio {
  user: string;
  tournament: string;
  weights: TokenAllocation[];
  performance?: number;
}

export enum TournamentStatus {
  UPCOMING = "upcoming",
  REGISTRATION = "registration",
  ACTIVE = "active",
  COMPLETED = "completed",
  FINALIZED = "finalized",
}

export interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price: number;
  price_change_percentage_24h: number;
  color: string;
}
