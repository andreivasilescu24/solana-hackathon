import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";
import { useTournament } from "../contexts/TournamentContext";
import { useAuth } from "../contexts/AuthContext";
import { TournamentStatus, Tournament } from "../types";
import TournamentCard from "../components/tournament/TournamentCard";
import { getTournamentStatus } from "../utils/formatters";

const Dashboard: React.FC = () => {
  const { tournaments, userPortfolios, isLoading } = useTournament();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "all" | "my-tournaments" | "active" | "upcoming"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>(
    []
  );

  // Apply filters and search
  useEffect(() => {
    if (!tournaments) return;

    let filtered = [...tournaments];

    // Filter by tab
    if (activeTab === "my-tournaments" && user) {
      // Find tournaments where the user has a portfolio
      const userTournamentIds = userPortfolios
        .filter((portfolio) => portfolio.user === user.id)
        .map((portfolio) => portfolio.tournament);

      filtered = filtered.filter((tournament) =>
        userTournamentIds.includes(tournament.id)
      );
    } else if (activeTab === "active") {
      filtered = filtered.filter(
        (tournament) =>
          getTournamentStatus(tournament) === TournamentStatus.ACTIVE
      );
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (tournament) =>
          getTournamentStatus(tournament) === TournamentStatus.UPCOMING ||
          getTournamentStatus(tournament) === TournamentStatus.REGISTRATION
      );
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tournament) =>
          tournament.name?.toLowerCase().includes(query) ||
          tournament.description?.toLowerCase().includes(query) ||
          tournament.id.toLowerCase().includes(query)
      );
    }

    setFilteredTournaments(filtered);
  }, [tournaments, activeTab, searchQuery, userPortfolios, user]);

  // Stats for user's tournaments
  const getUserStats = (): {
    joined: number;
    active: number;
    upcoming: number;
  } => {
    if (!user || !userPortfolios) {
      return { joined: 0, active: 0, upcoming: 0 };
    }

    const userTournamentIds = userPortfolios
      .filter((portfolio) => portfolio.user === user.id)
      .map((portfolio) => portfolio.tournament);

    const userTournaments = tournaments.filter((tournament) =>
      userTournamentIds.includes(tournament.id)
    );

    const active = userTournaments.filter(
      (tournament) =>
        getTournamentStatus(tournament) === TournamentStatus.ACTIVE
    ).length;

    const upcoming = userTournaments.filter(
      (tournament) =>
        getTournamentStatus(tournament) === TournamentStatus.UPCOMING ||
        getTournamentStatus(tournament) === TournamentStatus.REGISTRATION
    ).length;

    return {
      joined: userTournamentIds.length,
      active,
      upcoming,
    };
  };

  const stats = getUserStats();

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-secondary-400 to-primary-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-light-200">
            Find and join tournaments or create your own
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link
            to="/tournaments/create"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 rounded-md hover:from-secondary-600 hover:to-primary-600 transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-1" />
            <span>Create Tournament</span>
          </Link>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-200 p-6 rounded-lg border border-dark-100">
          <h3 className="text-lg font-medium text-light-200 mb-1">
            Tournaments Joined
          </h3>
          <p className="text-3xl font-bold text-light-100">{stats.joined}</p>
        </div>

        <div className="bg-dark-200 p-6 rounded-lg border border-dark-100">
          <h3 className="text-lg font-medium text-light-200 mb-1">
            Active Tournaments
          </h3>
          <p className="text-3xl font-bold text-light-100">{stats.active}</p>
        </div>

        <div className="bg-dark-200 p-6 rounded-lg border border-dark-100">
          <h3 className="text-lg font-medium text-light-200 mb-1">
            Upcoming Tournaments
          </h3>
          <p className="text-3xl font-bold text-light-100">{stats.upcoming}</p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-dark-100 text-secondary-400"
                : "text-light-200 hover:text-secondary-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("my-tournaments")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "my-tournaments"
                ? "bg-dark-100 text-secondary-400"
                : "text-light-200 hover:text-secondary-400"
            }`}
          >
            My Tournaments
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "active"
                ? "bg-dark-100 text-secondary-400"
                : "text-light-200 hover:text-secondary-400"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-dark-100 text-secondary-400"
                : "text-light-200 hover:text-secondary-400"
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-light-300" />
          </div>
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-dark-200 border border-dark-100 text-light-100 placeholder-light-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Tournament Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-400"></div>
        </div>
      ) : filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Filter className="mx-auto h-12 w-12 text-light-300" />
          </div>
          <h3 className="text-xl font-medium mb-2 text-light-100">
            No tournaments found
          </h3>
          <p className="text-light-200 mb-6">
            {activeTab === "my-tournaments"
              ? "You haven't joined any tournaments yet."
              : "No tournaments match your current filters."}
          </p>
          {activeTab === "my-tournaments" && (
            <button
              onClick={() => setActiveTab("all")}
              className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 rounded-md hover:from-secondary-600 hover:to-primary-600 transition-all duration-300"
            >
              Browse All Tournaments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
