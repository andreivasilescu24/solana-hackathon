import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-light-100 mb-2">My Portfolio</h1>
            <p className="text-light-300">
              Track your performance across all active tournaments.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-lg">
            <TrendingUp size={20} className="text-success-500" />
            <span className="text-success-500 font-medium">+6.8%</span>
            <span className="text-light-300 text-sm">Overall Return</span>
          </div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-light-100">Performance Overview</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm text-light-300 hover:text-light-100 transition-colors">1D</button>
            <button className="px-3 py-1.5 text-sm bg-dark-200 text-light-100 rounded-md">1W</button>
            <button className="px-3 py-1.5 text-sm text-light-300 hover:text-light-100 transition-colors">1M</button>
            <button className="px-3 py-1.5 text-sm text-light-300 hover:text-light-100 transition-colors">ALL</button>
          </div>
        </div>
        
        <div className="h-80 flex items-center justify-center bg-dark-400 rounded-lg border border-dark-100">
          <BarChart3 size={36} className="text-light-300" />
          <span className="ml-2 text-light-300">Portfolio chart will appear here</span>
        </div>
      </div>

      {/* Active Positions */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <h2 className="text-xl font-semibold text-light-100 mb-6">Active Positions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-light-300 text-sm">
                <th className="text-left pb-4">Tournament</th>
                <th className="text-left pb-4">Asset</th>
                <th className="text-right pb-4">Allocation</th>
                <th className="text-right pb-4">Entry Price</th>
                <th className="text-right pb-4">Current Price</th>
                <th className="text-right pb-4">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">SC</span>
                    </div>
                    <span className="text-light-100">Summer Cup</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                    <span className="text-light-100">Solana</span>
                  </div>
                </td>
                <td className="text-right py-4 text-light-100">30%</td>
                <td className="text-right py-4 text-light-100">$24.50</td>
                <td className="text-right py-4 text-light-100">$27.85</td>
                <td className="text-right py-4">
                  <div className="flex items-center justify-end gap-1 text-success-500">
                    <TrendingUp size={16} />
                    <span>+12.5%</span>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">SC</span>
                    </div>
                    <span className="text-light-100">Summer Cup</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-secondary-500"></div>
                    <span className="text-light-100">BNB</span>
                  </div>
                </td>
                <td className="text-right py-4 text-light-100">15%</td>
                <td className="text-right py-4 text-light-100">$215.30</td>
                <td className="text-right py-4 text-light-100">$208.40</td>
                <td className="text-right py-4">
                  <div className="flex items-center justify-end gap-1 text-error-500">
                    <TrendingDown size={16} />
                    <span>-3.2%</span>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">SC</span>
                    </div>
                    <span className="text-light-100">Summer Cup</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent-500"></div>
                    <span className="text-light-100">Trump Coin</span>
                  </div>
                </td>
                <td className="text-right py-4 text-light-100">55%</td>
                <td className="text-right py-4 text-light-100">$0.42</td>
                <td className="text-right py-4 text-light-100">$0.46</td>
                <td className="text-right py-4">
                  <div className="flex items-center justify-end gap-1 text-success-500">
                    <TrendingUp size={16} />
                    <span>+8.7%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;