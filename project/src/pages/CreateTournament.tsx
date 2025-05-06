import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Wallet, Users } from "lucide-react";
import { useTournament } from "../contexts/TournamentContext";
import { useAuth } from "../contexts/AuthContext";
import { TokenAllocation } from "../types";
import PortfolioAllocationForm from "../components/tournament/PortfolioAllocationForm";

const CreateTournament: React.FC = () => {
  const { createTournament } = useTournament();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [entryFee, setEntryFee] = useState(0.1);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(24);
  const [maxUsers, setMaxUsers] = useState(10);
  const [maxTokensPerUser, setMaxTokensPerUser] = useState(5);
  const [portfolio, setPortfolio] = useState<TokenAllocation[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // Default tournament is a mock tournament to satisfy the form requirements
  const defaultTournament = {
    id: "new-tournament",
    creator: user?.id || "creator",
    entryFee: 0.1,
    startTime: Date.now() + 3600000, // 1 hour from now
    endTime: Date.now() + 86400000, // 24 hours from now
    prizePool: 0,
    isFinalized: false,
    isClaimed: false,
    winner: null,
    maxTokensPerUser: 5,
    maxUsers: 10,
    currentUsers: 0,
  };

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsCreating(true);
      setError(null);

      // Validate form
      if (!name.trim()) {
        setError("Tournament name is required");
        return;
      }

      if (!startDate || !startTime) {
        setError("Start date and time are required");
        return;
      }

      // Parse start date and time
      const startDateTime = new Date(`${startDate}T${startTime}`);
      if (isNaN(startDateTime.getTime())) {
        setError("Invalid start date or time");
        return;
      }

      // Calculate end time based on duration (in hours)
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + duration);

      // Create tournament data
      const tournamentData = {
        name,
        description,
        creator: user?.id || "creator",
        entryFee,
        startTime: startDateTime.getTime(),
        endTime: endDateTime.getTime(),
        prizePool: entryFee * maxUsers, // Estimate prize pool
        isFinalized: false,
        isClaimed: false,
        winner: null,
        maxTokensPerUser,
        maxUsers,
        currentUsers: 1, // Creator is the first participant
      };

      // Create tournament and get the new tournament ID
      const newTournament = await createTournament(tournamentData, portfolio);

      // Navigate to the new tournament page
      navigate(`/tournaments/${newTournament.id}`);
    } catch (err) {
      console.error("Failed to create tournament:", err);
      setError("Failed to create tournament. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const nextStep = () => {
    // Validate step 1 before proceeding
    if (step === 1) {
      if (!name.trim()) {
        setError("Tournament name is required");
        return;
      }

      if (!startDate || !startTime) {
        setError("Start date and time are required");
        return;
      }

      // Parse start date and time
      const startDateTime = new Date(`${startDate}T${startTime}`);
      if (isNaN(startDateTime.getTime()) || startDateTime < new Date()) {
        setError("Invalid start date or time (must be in the future)");
        return;
      }
    }

    setStep(2);
    setError(null);
  };

  const prevStep = () => {
    setStep(1);
    setError(null);
  };

  // Calculate tomorrow's date for default value
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().slice(0, 10);

  // Set default start time (current time)
  const defaultStartTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Tournament</h1>

      {error && (
        <div className="bg-error-100 text-error-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="card p-6 mb-8">
        {step === 1 ? (
          <form>
            <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Tournament Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Weekend Warriors"
                  className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A description of your tournament and its rules..."
                  className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24"
                />
              </div>

              <div>
                <label
                  htmlFor="entryFee"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Entry Fee (SOL)
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="number"
                    id="entryFee"
                    value={entryFee}
                    onChange={(e) =>
                      setEntryFee(parseFloat(e.target.value) || 0)
                    }
                    min="0.001"
                    step="0.001"
                    className="w-full pl-10 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="date"
                      id="startDate"
                      value={startDate || tomorrowFormatted}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 10)}
                      className="w-full pl-10 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="time"
                      id="startTime"
                      value={startTime || defaultStartTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full pl-10 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Duration (Hours)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) =>
                      setDuration(parseInt(e.target.value) || 24)
                    }
                    min="1"
                    max="168"
                    className="w-full pl-10 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <p className="text-sm text-neutral-500 mt-1">
                  Maximum duration: 168 hours (7 days)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="maxUsers"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Max Participants
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="number"
                      id="maxUsers"
                      value={maxUsers}
                      onChange={(e) =>
                        setMaxUsers(parseInt(e.target.value) || 10)
                      }
                      min="2"
                      max="100"
                      className="w-full pl-10 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="maxTokensPerUser"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Max Tokens Per User
                  </label>
                  <select
                    id="maxTokensPerUser"
                    value={maxTokensPerUser}
                    onChange={(e) =>
                      setMaxTokensPerUser(parseInt(e.target.value))
                    }
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="1">1 token</option>
                    <option value="2">2 tokens</option>
                    <option value="3">3 tokens</option>
                    <option value="4">4 tokens</option>
                    <option value="5">5 tokens</option>
                    <option value="8">8 tokens</option>
                    <option value="10">10 tokens</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Next: Configure Portfolio
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Configure Your Portfolio
            </h2>
            <p className="text-neutral-600 mb-6">
              As the tournament creator, you need to configure your own
              portfolio. Your entry fee will be added to the prize pool.
            </p>

            <PortfolioAllocationForm
              tournament={{
                ...defaultTournament,
                maxTokensPerUser,
              }}
              onSubmit={setPortfolio}
              initialAllocations={portfolio}
            />

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleCreateTournament}
                disabled={
                  isCreating ||
                  portfolio.length === 0 ||
                  portfolio.reduce((sum, token) => sum + token.weight, 0) !==
                    100
                }
                className={`px-6 py-2 rounded-md transition-colors ${
                  isCreating ||
                  portfolio.length === 0 ||
                  portfolio.reduce((sum, token) => sum + token.weight, 0) !==
                    100
                    ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                {isCreating ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                    Creating...
                  </span>
                ) : (
                  "Create Tournament"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTournament;
