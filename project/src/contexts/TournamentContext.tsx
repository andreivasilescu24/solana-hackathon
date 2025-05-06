import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Tournament, TokenAllocation, UserPortfolio } from "../types";

interface TournamentContextType {
  tournaments: Tournament[];
  userPortfolios: UserPortfolio[];
  isLoading: boolean;
  error: string | null;
  createTournament: (
    tournament: Omit<Tournament, "id">,
    creatorPortfolio: TokenAllocation[]
  ) => Promise<Tournament>;
  joinTournament: (
    tournamentId: string,
    portfolio: TokenAllocation[]
  ) => Promise<void>;
  getTournamentById: (id: string) => Tournament | undefined;
  getUserPortfolioForTournament: (
    tournamentId: string,
    userId: string
  ) => UserPortfolio | undefined;
  refreshTournaments: () => Promise<void>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(
  undefined
);

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
};

interface TournamentProviderProps {
  children: ReactNode;
}

export const TournamentProvider = ({ children }: TournamentProviderProps) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [userPortfolios, setUserPortfolios] = useState<UserPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tournaments on mount
  useEffect(() => {
    refreshTournaments();
  }, []);

  // Mock function to fetch tournaments
  const refreshTournaments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real implementation, this would call the Solana program
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      const mockTournaments: Tournament[] = [
        {
          id: "tournament-1",
          creator: "creator-pubkey-1",
          entryFee: 0.1,
          startTime: Date.now() + 3600000, // 1 hour from now
          endTime: Date.now() + 86400000, // 24 hours from now
          prizePool: 1.0,
          isFinalized: false,
          isClaimed: false,
          winner: null,
          maxTokensPerUser: 5,
          maxUsers: 10,
          currentUsers: 2,
          name: "Weekend Warriors",
          description: "A 24-hour tournament to find the best weekend trader",
        },
        {
          id: "tournament-2",
          creator: "creator-pubkey-2",
          entryFee: 0.5,
          startTime: Date.now() - 86400000, // Started yesterday
          endTime: Date.now() + 172800000, // Ends in 2 days
          prizePool: 5.0,
          isFinalized: false,
          isClaimed: false,
          winner: null,
          maxTokensPerUser: 3,
          maxUsers: 20,
          currentUsers: 15,
          name: "Crypto Masters",
          description:
            "Choose your top 3 tokens and compete for the biggest gains",
        },
      ];

      const mockUserPortfolios: UserPortfolio[] = [
        {
          user: "user-123",
          tournament: "tournament-1",
          weights: [
            {
              mint: "SOL",
              weight: 40,
              name: "Solana",
              price: 142.5,
              change24h: 2.3,
            },
            {
              mint: "ETH",
              weight: 30,
              name: "Ethereum",
              price: 3245.8,
              change24h: -1.2,
            },
            {
              mint: "BTC",
              weight: 30,
              name: "Bitcoin",
              price: 64250.0,
              change24h: 0.8,
            },
          ],
          performance: 1.8, // 1.8% gain
        },
      ];

      setTournaments(mockTournaments);
      setUserPortfolios(mockUserPortfolios);
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);
      setError("Failed to load tournaments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const createTournament = async (
    tournamentData: Omit<Tournament, "id">,
    creatorPortfolio: TokenAllocation[]
  ): Promise<Tournament> => {
    try {
      setIsLoading(true);

      // In a real implementation, this would call the Solana program
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock tournament creation
      const newTournament: Tournament = {
        ...tournamentData,
        id: "tournament-" + Math.random().toString(36).substring(2, 9),
      };

      // Add new tournament to state
      setTournaments((prev) => [...prev, newTournament]);

      // Create creator's portfolio
      const newPortfolio: UserPortfolio = {
        user: tournamentData.creator,
        tournament: newTournament.id,
        weights: creatorPortfolio,
        performance: 0, // Initial performance is 0%
      };

      // Add creator's portfolio to state
      setUserPortfolios((prev) => [...prev, newPortfolio]);

      return newTournament;
    } catch (error) {
      console.error("Failed to create tournament:", error);
      setError("Failed to create tournament. Please try again later.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const joinTournament = async (
    tournamentId: string,
    portfolio: TokenAllocation[]
  ): Promise<void> => {
    try {
      setIsLoading(true);

      // Get current user from local storage (mock for demo)
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("Not authenticated");
      }
      const user = JSON.parse(userString);

      // In a real implementation, this would call the Solana program
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if tournament exists
      const tournament = tournaments.find((t) => t.id === tournamentId);
      if (!tournament) {
        throw new Error("Tournament not found");
      }

      // Check if tournament is still open for registration
      if (tournament.startTime < Date.now()) {
        throw new Error("Tournament registration is closed");
      }

      // Create user portfolio
      const newPortfolio: UserPortfolio = {
        user: user.id,
        tournament: tournamentId,
        weights: portfolio,
        performance: 0, // Initial performance is 0%
      };

      // Add user portfolio to state
      setUserPortfolios((prev) => [...prev, newPortfolio]);

      // Update tournament current users count
      setTournaments((prev) =>
        prev.map((t) =>
          t.id === tournamentId ? { ...t, currentUsers: t.currentUsers + 1 } : t
        )
      );
    } catch (error) {
      console.error("Failed to join tournament:", error);
      setError("Failed to join tournament. Please try again later.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getTournamentById = (id: string): Tournament | undefined => {
    return tournaments.find((tournament) => tournament.id === id);
  };

  const getUserPortfolioForTournament = (
    tournamentId: string,
    userId: string
  ): UserPortfolio | undefined => {
    return userPortfolios.find(
      (portfolio) =>
        portfolio.tournament === tournamentId && portfolio.user === userId
    );
  };

  const value = {
    tournaments,
    userPortfolios,
    isLoading,
    error,
    createTournament,
    joinTournament,
    getTournamentById,
    getUserPortfolioForTournament,
    refreshTournaments,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
