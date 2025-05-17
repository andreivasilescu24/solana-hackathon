import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Wallet, Users } from "lucide-react";
import { useTournament } from "../contexts/TournamentContext";
import { useAuth } from "../contexts/AuthContext";
import { TokenAllocation } from "../types";
import PortfolioAllocationForm from "../components/tournament/PortfolioAllocationForm";

// Predefined token addresses and colors
const TOKENS = {
  SOL: {
    symbol: "SOL",
    name: "Solana",
    color: "#14F195",  // Solana Green
    address: "So11111111111111111111111111111111111111112"
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    color: "#627EEA",  // Ethereum Blue
    address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"
  },
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    color: "#F7931A",  // Bitcoin Orange
    address: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E"
  },
  BNB: {
    symbol: "BNB",
    name: "Binance Coin",
    color: "#F3BA2F",  // Binance Yellow
    address: "9AhKqLR67hwapvG8SA2JFXaCshXc9nALJjpKaHZrsbkw"
  }
};

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
  const [portfolio, setPortfolio] = useState<TokenAllocation[]>([
    { mint: 'SOL', weight: 25, name: TOKENS.SOL.name, color: TOKENS.SOL.color },
    { mint: 'ETH', weight: 25, name: TOKENS.ETH.name, color: TOKENS.ETH.color },
    { mint: 'BTC', weight: 25, name: TOKENS.BTC.name, color: TOKENS.BTC.color },
    { mint: 'BNB', weight: 25, name: TOKENS.BNB.name, color: TOKENS.BNB.color },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize start time to the next hour
  const getInitialStartTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now.toISOString().slice(0, 16);
  };

  // Initialize end time based on start time and duration
  const getInitialEndTime = (startTime: string, durationHours: number) => {
    const startDate = new Date(startTime);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + durationHours);
    return endDate.toISOString().slice(0, 16);
  };

  const initialStartTime = getInitialStartTime();

  const [formData, setFormData] = useState({
    entryFee: 1, // in SOL
    startTime: initialStartTime,
    endTime: getInitialEndTime(initialStartTime, duration),
    maxParticipants: 5,
    maxTokensPerUser: 5,
    weights: [
      { token: 'SOL', weight: 25, color: TOKENS.SOL.color },
      { token: 'ETH', weight: 25, color: TOKENS.ETH.color },
      { token: 'BTC', weight: 25, color: TOKENS.BTC.color },
      { token: 'BNB', weight: 25, color: TOKENS.BNB.color },
    ],
  });

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

      // Parse start date and time
      const startDateTime = new Date(formData.startTime);
      if (isNaN(startDateTime.getTime()) || startDateTime < new Date()) {
        setError("Start time must be in the future");
        return;
      }

      // Calculate end time based on duration
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + duration);

      // Convert weights to the correct format
      const tokenAllocations = formData.weights.map(w => ({
        mint: w.token,
        weight: w.weight,
      }));

      // Create tournament data
      const tournamentData = {
        id: Math.random().toString(36).substring(2),
        name,
        description,
        creator: user?.id || "creator",
        entryFee: formData.entryFee,
        startTime: startDateTime.getTime(),
        endTime: endDateTime.getTime(),
        prizePool: formData.entryFee * formData.maxParticipants, // Estimate prize pool
        isFinalized: false,
        isClaimed: false,
        winner: null,
        maxTokensPerUser: formData.maxTokensPerUser,
        maxUsers: formData.maxParticipants,
        currentUsers: 1, // Creator is the first participant
      };

      // Create tournament and get the new tournament ID
      const newTournament = await createTournament(tournamentData, tokenAllocations);

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

      // Parse start date and time
      const startDateTime = new Date(formData.startTime);
      if (isNaN(startDateTime.getTime()) || startDateTime < new Date()) {
        setError("Start time must be in the future");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsCreating(true);
      setError(null);

      // Validate form
      if (!name.trim()) {
        setError("Tournament name is required");
        return;
      }

      // Parse start date and time
      const startDateTime = new Date(formData.startTime);
      if (isNaN(startDateTime.getTime()) || startDateTime < new Date()) {
        setError("Start time must be in the future");
        return;
      }

      // Calculate end time based on duration
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + duration);

      // Convert weights to the correct format
      const tokenAllocations = formData.weights.map(w => ({
        mint: w.token,
        weight: w.weight,
      }));

      // Create tournament data
      const tournamentData = {
        id: Math.random().toString(36).substring(2),
        name,
        description,
        creator: user?.id || "creator",
        entryFee: formData.entryFee,
        startTime: startDateTime.getTime(),
        endTime: endDateTime.getTime(),
        prizePool: formData.entryFee * formData.maxParticipants, // Estimate prize pool
        isFinalized: false,
        isClaimed: false,
        winner: null,
        maxTokensPerUser: formData.maxTokensPerUser,
        maxUsers: formData.maxParticipants,
        currentUsers: 1, // Creator is the first participant
      };

      // Create tournament and get the new tournament ID
      const newTournament = await createTournament(tournamentData, tokenAllocations);

      // Navigate to the new tournament page
      navigate(`/tournaments/${newTournament.id}`);
    } catch (err) {
      console.error("Failed to create tournament:", err);
      setError("Failed to create tournament. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleWeightChange = (index: number, value: number) => {
    const newWeights = [...formData.weights];
    newWeights[index] = { ...newWeights[index], weight: value };
    setFormData({ ...formData, weights: newWeights });
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setFormData(prev => {
      // Calculate new end time based on duration
      const startDate = new Date(newStartTime);
      // Round to nearest minute
      startDate.setSeconds(0, 0);
      
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + duration);
      endDate.setSeconds(0, 0);
      
      return {
        ...prev,
        startTime: startDate.toISOString().slice(0, 16), // Format to YYYY-MM-DDThh:mm
        endTime: endDate.toISOString().slice(0, 16),
      };
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value) || 24;
    setDuration(newDuration);

    // Update end time based on new duration
    setFormData(prev => {
      if (!prev.startTime) return prev;

      const startDate = new Date(prev.startTime);
      startDate.setSeconds(0, 0);
      
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + newDuration);
      endDate.setSeconds(0, 0);

      return {
        ...prev,
        endTime: endDate.toISOString().slice(0, 16),
      };
    });
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-secondary-400 to-primary-400 text-transparent bg-clip-text">
        Create Tournament
      </h1>

      {error && (
        <div className="bg-error-400/10 text-error-400 p-4 rounded-md mb-6 border border-error-400/30">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-success-400/10 text-success-400 p-4 rounded-md mb-6 border border-success-400/30">
          {success}
        </div>
      )}

      <div className="bg-dark-200 border border-dark-100 rounded-xl p-6 mb-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-light-100 bg-gradient-to-r from-secondary-400 to-primary-400 text-transparent bg-clip-text">
                Tournament Details
              </h2>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-light-300 mb-1"
                >
                  Tournament Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Weekend Warriors"
                  className="w-full p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-light-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-light-300 mb-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A description of your tournament and its rules..."
                  className="w-full p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24 placeholder:text-light-400"
                />
              </div>

              <div>
                <label
                  htmlFor="entryFee"
                  className="block text-sm font-medium text-light-300 mb-1"
                >
                  Entry Fee (SOL)
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="number"
                    id="entryFee"
                    value={formData.entryFee}
                    onChange={(e) => setFormData({ ...formData, entryFee: parseFloat(e.target.value) })}
                    min="0.001"
                    step="0.001"
                    className="w-full pl-10 p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-light-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-light-300 mb-1"
                  >
                    Start Date & Time
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="datetime-local"
                      id="startDate"
                      value={formData.startTime}
                      onChange={handleStartTimeChange}
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full pl-10 p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-light-400 [&::-webkit-calendar-picker-indicator]:bg-white [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1"
                      required
                    />
                  </div>
                  <p className="text-sm text-light-400 mt-1">
                    Select both date and time
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-light-300 mb-1"
                  >
                    Duration (Hours)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="number"
                      id="duration"
                      value={duration}
                      onChange={handleDurationChange}
                      min="1"
                      max="168"
                      className="w-full pl-10 p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-light-400"
                      required
                    />
                  </div>
                  <p className="text-sm text-light-400 mt-1">
                    Maximum duration: 168 hours (7 days)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="maxUsers"
                    className="block text-sm font-medium text-light-300 mb-1"
                  >
                    Max Participants
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="number"
                      id="maxUsers"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                      min="2"
                      max="100"
                      className="w-full pl-10 p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-light-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="maxTokensPerUser"
                    className="block text-sm font-medium text-light-300 mb-1"
                  >
                    Max Tokens Per User
                  </label>
                  <select
                    id="maxTokensPerUser"
                    value={formData.maxTokensPerUser}
                    onChange={(e) =>
                      setFormData({ ...formData, maxTokensPerUser: parseInt(e.target.value) })
                    }
                    className="w-full p-2 bg-dark-100 border border-dark-300 text-light-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-md bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 font-medium hover:from-secondary-600 hover:to-primary-600 transition-all duration-300 shadow-lg"
                >
                  Next: Configure Portfolio
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 text-light-100 bg-gradient-to-r from-secondary-400 to-primary-400 text-transparent bg-clip-text">
                Configure Your Portfolio
              </h2>
              <p className="text-light-300 mb-6">
                As the tournament creator, you need to configure your own
                portfolio. Your entry fee will be added to the prize pool.
              </p>

              <PortfolioAllocationForm
                tournament={{
                  ...defaultTournament,
                  maxTokensPerUser: formData.maxTokensPerUser,
                }}
                onSubmit={setPortfolio}
                initialAllocations={portfolio}
              />

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-dark-300 text-light-300 rounded-md hover:bg-dark-100 transition-colors"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-md transition-all font-medium shadow-lg ${
                    loading
                      ? "bg-dark-300 text-light-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 hover:from-secondary-600 hover:to-primary-600"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-light-100 rounded-full"></span>
                      Creating...
                    </span>
                  ) : (
                    "Create Tournament"
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;
