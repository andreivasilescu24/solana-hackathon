import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Award, Wallet, RefreshCw, ArrowLeft } from "lucide-react";
import { useTournament } from "../contexts/TournamentContext";
import { useAuth } from "../contexts/AuthContext";
import { TournamentStatus, TokenAllocation } from "../types";
import PortfolioAllocationForm from "../components/tournament/PortfolioAllocationForm";
import LeaderboardTable from "../components/tournament/LeaderboardTable";
import PortfolioChart from "../components/tournament/PortfolioChart";
import {
  formatCurrency,
  formatDate,
  formatTimeLeft,
  getTournamentStatus,
} from "../utils/formatters";

const TournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getTournamentById,
    userPortfolios,
    joinTournament,
    refreshTournaments,
    isLoading,
  } = useTournament();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  if (!id) {
    return <div>Tournament ID not found</div>;
  }

  const tournament = getTournamentById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-400"></div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Tournament Not Found</h2>
        <p className="mb-6">
          The tournament you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Get user's portfolio for this tournament if it exists
  const userPortfolio = user
    ? userPortfolios.find(
        (portfolio) => portfolio.tournament === id && portfolio.user === user.id
      )
    : null;

  // Get all portfolios for this tournament
  const tournamentPortfolios = userPortfolios.filter(
    (portfolio) => portfolio.tournament === id
  );

  const status = getTournamentStatus(tournament);

  const handleJoinTournament = async (allocations: TokenAllocation[]) => {
    try {
      setError(null);
      await joinTournament(id, allocations);
      await refreshTournaments();
    } catch (err) {
      console.error("Failed to join tournament:", err);
      setError("Failed to join tournament. Please try again.");
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case TournamentStatus.UPCOMING:
        return "bg-dark-100 text-light-200";
      case TournamentStatus.REGISTRATION:
        return "bg-accent-900/50 text-accent-400";
      case TournamentStatus.ACTIVE:
        return "bg-success-900/50 text-success-400";
      case TournamentStatus.COMPLETED:
      case TournamentStatus.FINALIZED:
        return "bg-primary-900/50 text-primary-400";
      default:
        return "bg-dark-100 text-light-200";
    }
  };

  return (
    <div className="container py-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-light-200 hover:text-secondary-400 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Dashboard</span>
      </button>

      <div className="relative mb-6">
        {/* Random gradient background based on tournament id */}
        <div
          className="h-40 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to right, 
              hsl(${parseInt(tournament.id.substr(-3), 16) % 360}, 70%, 55%), 
              hsl(${
                (parseInt(tournament.id.substr(-3), 16) + 40) % 360
              }, 70%, 55%))`,
          }}
        >
          <h1 className="text-3xl font-bold text-white text-center">
            {tournament.name || `Tournament #${tournament.id.substring(0, 8)}`}
          </h1>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
          >
            {status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Tournament Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dark-200 rounded-lg border border-dark-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-light-100">
              Tournament Details
            </h2>
            <p className="text-light-200 mb-6">
              {tournament.description ||
                "Compete with other traders to see who can achieve the highest returns."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-dark-100 rounded-lg">
                <Clock className="h-6 w-6 text-secondary-400 mx-auto mb-2" />
                <h3 className="text-sm text-light-300 mb-1">Start Time</h3>
                <p className="font-medium text-light-100">
                  {formatDate(tournament.startTime)}
                </p>
              </div>

              <div className="text-center p-4 bg-dark-100 rounded-lg">
                <Clock className="h-6 w-6 text-secondary-400 mx-auto mb-2" />
                <h3 className="text-sm text-light-300 mb-1">End Time</h3>
                <p className="font-medium text-light-100">
                  {formatDate(tournament.endTime)}
                </p>
              </div>

              <div className="text-center p-4 bg-dark-100 rounded-lg">
                <Wallet className="h-6 w-6 text-secondary-400 mx-auto mb-2" />
                <h3 className="text-sm text-light-300 mb-1">Entry Fee</h3>
                <p className="font-medium text-light-100">
                  {formatCurrency(tournament.entryFee)}
                </p>
              </div>

              <div className="text-center p-4 bg-dark-100 rounded-lg">
                <Award className="h-6 w-6 text-secondary-400 mx-auto mb-2" />
                <h3 className="text-sm text-light-300 mb-1">Prize Pool</h3>
                <p className="font-medium text-light-100">
                  {formatCurrency(tournament.prizePool)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-light-200">Time Remaining:</span>
                <span className="font-medium text-light-100">
                  {formatTimeLeft(tournament)}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-light-200">Participants:</span>
                <span className="font-medium text-light-100">
                  {tournament.currentUsers} / {tournament.maxUsers}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-light-200">
                  Max Tokens per Portfolio:
                </span>
                <span className="font-medium text-light-100">
                  {tournament.maxTokensPerUser}
                </span>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-dark-200 rounded-lg border border-dark-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-light-100">
                Leaderboard
              </h2>
              <button
                onClick={refreshTournaments}
                className="flex items-center text-secondary-400 hover:text-secondary-300 text-sm transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>

            <LeaderboardTable portfolios={tournamentPortfolios} />
          </div>
        </div>

        {/* Right column - User's Portfolio */}
        <div>
          <div className="bg-dark-200 rounded-lg border border-dark-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-light-100">
              {userPortfolio ? "Your Portfolio" : "Join Tournament"}
            </h2>

            {error && (
              <div className="bg-error-900/50 text-error-400 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {!user ? (
              <p className="text-light-200">
                Please log in to join this tournament.
              </p>
            ) : userPortfolio ? (
              <div>
                <PortfolioChart
                  allocations={userPortfolio.weights}
                  className="mb-6"
                />

                <div className="bg-dark-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-light-200">Current Performance:</span>
                    <span
                      className={`font-semibold ${
                        userPortfolio.performance &&
                        userPortfolio.performance >= 0
                          ? "text-success-600"
                          : "text-error-600"
                      }`}
                    >
                      {userPortfolio.performance
                        ? `${
                            userPortfolio.performance > 0 ? "+" : ""
                          }${userPortfolio.performance.toFixed(2)}%`
                        : "0.00%"}
                    </span>
                  </div>
                </div>

                {status === TournamentStatus.REGISTRATION && (
                  <p className="text-sm text-light-300">
                    Your portfolio is locked in. The tournament will begin soon.
                  </p>
                )}

                {status === TournamentStatus.ACTIVE && (
                  <p className="text-sm text-light-300">
                    The tournament is active. Your portfolio is being tracked in
                    real-time.
                  </p>
                )}

                {(status === TournamentStatus.COMPLETED ||
                  status === TournamentStatus.FINALIZED) && (
                  <div className="text-center p-4 bg-dark-100 rounded-lg">
                    <h3 className="font-medium mb-2">Tournament Completed</h3>
                    <p className="text-sm text-light-200 mb-4">
                      {tournament.winner === user.id
                        ? "Congratulations! You won this tournament."
                        : "Thank you for participating in this tournament."}
                    </p>

                    {tournament.winner === user.id && !tournament.isClaimed && (
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                        Claim Your Prize
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : status === TournamentStatus.REGISTRATION ? (
              <div>
                <p className="text-light-200 mb-4">
                  Join this tournament by paying the entry fee and configuring
                  your portfolio.
                </p>

                <div className="bg-dark-100 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-light-200">Entry Fee:</span>
                    <span className="font-semibold">
                      {formatCurrency(tournament.entryFee)}
                    </span>
                  </div>
                </div>

                <PortfolioAllocationForm
                  tournament={tournament}
                  onSubmit={handleJoinTournament}
                />
              </div>
            ) : (
              <p className="text-light-200">
                {status === TournamentStatus.UPCOMING
                  ? "This tournament isn't open for registration yet."
                  : "Registration for this tournament has ended."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
