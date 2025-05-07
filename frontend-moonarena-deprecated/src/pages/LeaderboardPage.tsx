import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-light-100 mb-2">Global Leaderboard</h1>
            <p className="text-light-300">
              Top performers across all active tournaments.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-lg">
            <Trophy size={20} className="text-primary-500" />
            <span className="text-light-100 font-medium">#24</span>
            <span className="text-light-300 text-sm">Your Rank</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-light-300 text-sm">
                <th className="text-left pb-4">Rank</th>
                <th className="text-left pb-4">Trader</th>
                <th className="text-right pb-4">Active Tournaments</th>
                <th className="text-right pb-4">Best Return</th>
                <th className="text-right pb-4">Total Earnings</th>
                <th className="text-right pb-4">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {[...Array(10)].map((_, index) => (
                <tr key={index} className={index === 3 ? 'bg-primary-600/5' : ''}>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {index < 3 ? (
                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <Trophy size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center">
                          <span className="text-light-100 font-medium">#{index + 1}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center">
                        <span className="text-light-100 font-medium">T{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-light-100 font-medium">Trader {index + 1}</div>
                        <div className="text-sm text-light-300">@trader{index + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-light-100">{3 - (index % 2)}</td>
                  <td className="text-right py-4">
                    <div className="flex items-center justify-end gap-1 text-success-500">
                      <TrendingUp size={16} />
                      <span>+{(25 - index * 1.5).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="text-right py-4 text-light-100">{(10 - index * 0.8).toFixed(2)} ETH</td>
                  <td className="text-right py-4 text-light-100">{85 - index * 5}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tournament Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summer Crypto Cup */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <Trophy size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-light-100">Summer Crypto Cup</h2>
                <span className="text-sm text-light-300">324 participants</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-light-300">Your Position</div>
              <div className="text-xl font-semibold text-light-100">#15</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-400 rounded-lg border border-dark-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-light-100">#{index + 1}</span>
                  </div>
                  <span className="text-light-100">@trader{index + 1}</span>
                </div>
                <div className="flex items-center gap-1 text-success-500">
                  <TrendingUp size={16} />
                  <span>+{(20 - index * 2).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Altcoin Challenge */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center">
                <Trophy size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-light-100">Altcoin Challenge</h2>
                <span className="text-sm text-light-300">156 participants</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-light-300">Your Position</div>
              <div className="text-xl font-semibold text-light-100">#42</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-400 rounded-lg border border-dark-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-light-100">#{index + 1}</span>
                  </div>
                  <span className="text-light-100">@trader{index + 1}</span>
                </div>
                <div className="flex items-center gap-1 text-success-500">
                  <TrendingUp size={16} />
                  <span>+{(18 - index * 2).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;