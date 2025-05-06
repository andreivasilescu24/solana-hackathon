import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { TokenAllocation, TokenInfo, Tournament } from "../../types";

interface PortfolioAllocationFormProps {
  tournament: Tournament;
  onSubmit: (allocations: TokenAllocation[]) => void;
  initialAllocations?: TokenAllocation[];
}

const PortfolioAllocationForm: React.FC<PortfolioAllocationFormProps> = ({
  tournament,
  onSubmit,
  initialAllocations = [],
}) => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [allocations, setAllocations] =
    useState<TokenAllocation[]>(initialAllocations);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total weight
  const totalWeight = allocations.reduce(
    (sum, allocation) => sum + allocation.weight,
    0
  );

  useEffect(() => {
    // Fetch available tokens
    const fetchTokens = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a production app, this would fetch from a real API
        // Mock data for now
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockTokens: TokenInfo[] = [
          {
            id: "bitcoin",
            symbol: "BTC",
            name: "Bitcoin",
            image: "",
            current_price: 64250,
            price_change_percentage_24h: 0.8,
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "Ethereum",
            image: "",
            current_price: 3245.8,
            price_change_percentage_24h: -1.2,
          },
          {
            id: "solana",
            symbol: "SOL",
            name: "Solana",
            image: "",
            current_price: 142.5,
            price_change_percentage_24h: 2.3,
          },
          {
            id: "cardano",
            symbol: "ADA",
            name: "Cardano",
            image: "",
            current_price: 0.45,
            price_change_percentage_24h: -0.5,
          },
          {
            id: "binancecoin",
            symbol: "BNB",
            name: "Binance Coin",
            image: "",
            current_price: 605.2,
            price_change_percentage_24h: 1.1,
          },
          {
            id: "ripple",
            symbol: "XRP",
            name: "XRP",
            image: "",
            current_price: 0.52,
            price_change_percentage_24h: -2.7,
          },
          {
            id: "polkadot",
            symbol: "DOT",
            name: "Polkadot",
            image: "",
            current_price: 6.8,
            price_change_percentage_24h: 3.2,
          },
          {
            id: "dogecoin",
            symbol: "DOGE",
            name: "Dogecoin",
            image: "",
            current_price: 0.12,
            price_change_percentage_24h: 5.4,
          },
        ];

        setTokens(mockTokens);
      } catch (err) {
        console.error("Failed to fetch tokens:", err);
        setError("Failed to load available tokens. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const handleAddToken = () => {
    if (allocations.length >= tournament.maxTokensPerUser) {
      setError(
        `You can only select up to ${tournament.maxTokensPerUser} tokens`
      );
      return;
    }

    // Find a token that's not already in the allocations
    const unusedTokens = tokens.filter(
      (token) =>
        !allocations.some((allocation) => allocation.mint === token.symbol)
    );

    if (unusedTokens.length === 0) {
      setError("All available tokens are already in your portfolio");
      return;
    }

    const newToken = unusedTokens[0];
    const remainingWeight = 100 - totalWeight;
    const newWeight = Math.min(remainingWeight, 20); // Default to 20% or whatever is left

    setAllocations((prev) => [
      ...prev,
      {
        mint: newToken.symbol,
        weight: newWeight,
        name: newToken.name,
        price: newToken.current_price,
        change24h: newToken.price_change_percentage_24h,
      },
    ]);

    setError(null);
  };

  const handleRemoveToken = (index: number) => {
    setAllocations((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleWeightChange = (index: number, newWeight: number) => {
    // Ensure weight is between 0 and 100
    newWeight = Math.max(0, Math.min(100, newWeight));

    setAllocations((prev) =>
      prev.map((allocation, i) =>
        i === index ? { ...allocation, weight: newWeight } : allocation
      )
    );

    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (allocations.length === 0) {
      setError("Your portfolio must include at least one token");
      return;
    }

    if (totalWeight !== 100) {
      setError("Total allocation must equal 100%");
      return;
    }

    onSubmit(allocations);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary-400"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-light-100">
            Portfolio Allocation
          </h3>
          <span
            className={`font-medium ${
              totalWeight === 100 ? "text-success-400" : "text-error-400"
            }`}
          >
            Total: {totalWeight}%
          </span>
        </div>

        {allocations.length === 0 ? (
          <p className="text-light-300 text-center py-4">
            Add tokens to your portfolio using the button below
          </p>
        ) : (
          <div className="space-y-3">
            {allocations.map((allocation, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg bg-dark-100 border border-dark-100"
              >
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="font-medium text-light-100">
                      {allocation.name}
                    </span>
                    <span
                      className={
                        allocation.change24h && allocation.change24h >= 0
                          ? "text-success-400"
                          : "text-error-400"
                      }
                    >
                      {allocation.change24h
                        ? `${
                            allocation.change24h > 0 ? "+" : ""
                          }${allocation.change24h.toFixed(2)}%`
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-light-300">
                    <span>{allocation.mint}</span>
                    <span>
                      {allocation.price
                        ? `$${allocation.price.toLocaleString()}`
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-24">
                  <input
                    type="number"
                    value={allocation.weight}
                    onChange={(e) =>
                      handleWeightChange(index, parseInt(e.target.value) || 0)
                    }
                    className="w-16 px-2 py-1 text-right bg-dark-200 border border-dark-100 rounded text-light-100 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                  <span className="ml-1 text-light-200">%</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveToken(index)}
                  className="p-1 text-light-300 hover:text-error-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-md bg-error-900/50 text-error-400">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddToken}
            disabled={allocations.length >= tournament.maxTokensPerUser}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              allocations.length >= tournament.maxTokensPerUser
                ? "bg-dark-100 text-light-300 cursor-not-allowed"
                : "bg-dark-100 text-secondary-400 hover:text-secondary-300"
            }`}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Token
          </button>

          <button
            type="submit"
            disabled={totalWeight !== 100}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              totalWeight === 100
                ? "bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 hover:from-secondary-600 hover:to-primary-600"
                : "bg-dark-100 text-light-300 cursor-not-allowed"
            }`}
          >
            Join Tournament
          </button>
        </div>
      </div>
    </form>
  );
};

export default PortfolioAllocationForm;
