import React from "react";
import { UserPortfolio } from "../../types";
import { Trophy } from "lucide-react";

interface LeaderboardTableProps {
  portfolios: UserPortfolio[];
  isLoading?: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  portfolios,
  isLoading = false,
}) => {
  // Sort by performance (descending)
  const sortedPortfolios = [...portfolios].sort((a, b) => {
    return (b.performance || 0) - (a.performance || 0);
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary-400"></div>
      </div>
    );
  }

  if (sortedPortfolios.length === 0) {
    return (
      <div className="text-center py-8 text-light-300">
        No participants have joined this tournament yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-dark-100">
            <th className="py-3 px-4 text-left text-sm font-semibold text-light-200">
              Rank
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-light-200">
              User
            </th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-light-200">
              Portfolio
            </th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-light-200">
              Performance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-100">
          {sortedPortfolios.map((portfolio, index) => (
            <tr
              key={portfolio.user}
              className="hover:bg-dark-100/50 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-light-100">
                {index === 0 ? (
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 text-warning-400 mr-1" />
                    <span className="font-semibold bg-gradient-to-r from-warning-400 to-warning-500 bg-clip-text text-transparent">
                      1st
                    </span>
                  </div>
                ) : index === 1 ? (
                  <div className="flex items-center">
                    <span className="font-semibold text-light-300">2nd</span>
                  </div>
                ) : index === 2 ? (
                  <div className="flex items-center">
                    <span className="font-semibold text-light-400">3rd</span>
                  </div>
                ) : (
                  <span className="text-light-200">{index + 1}th</span>
                )}
              </td>
              <td className="py-3 px-4 text-sm text-light-100">
                {/* Truncate potentially long user IDs */}
                {portfolio.user.substring(0, 4)}...
                {portfolio.user.substring(portfolio.user.length - 4)}
              </td>
              <td className="py-3 px-4 text-sm text-right">
                <div className="flex justify-end space-x-1">
                  {portfolio.weights.slice(0, 3).map((token) => (
                    <span
                      key={token.mint}
                      className="px-2 py-1 bg-dark-100 text-light-200 rounded text-xs"
                    >
                      {token.mint}
                    </span>
                  ))}
                  {portfolio.weights.length > 3 && (
                    <span className="px-2 py-1 bg-dark-100 text-light-200 rounded text-xs">
                      +{portfolio.weights.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-sm font-medium text-right">
                <span
                  className={
                    portfolio.performance && portfolio.performance >= 0
                      ? "text-success-400"
                      : "text-error-400"
                  }
                >
                  {portfolio.performance
                    ? `${
                        portfolio.performance > 0 ? "+" : ""
                      }${portfolio.performance.toFixed(2)}%`
                    : "0.00%"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
