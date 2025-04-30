import React from 'react';
import { useParams } from 'react-router-dom';
import { Trophy, Users, Clock, Wallet, TrendingUp, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams();
  
  // Mock data - in a real app, this would come from your API
  const tournament = {
    id: id,
    name: id === '1' ? 'Summer Crypto Cup' : 'Altcoin Challenge',
    status: 'Active',
    endsIn: id === '1' ? '3d 12h' : '5d 8h',
    participants: id === '1' ? 324 : 156,
    prizePool: id === '1' ? '8.5 ETH' : '4.2 ETH',
    yourPosition: id === '1' ? 15 : 42,
    return: id === '1' ? '+8.3%' : '-2.1%',
    portfolio: {
      solana: { percentage: 30, return: '+12.5%' },
      bnb: { percentage: 15, return: '-3.2%' },
      trumpCoin: { percentage: 55, return: '+8.7%' },
    }
  };

  return (
    <div className="space-y-6">
      {/* Tournament Header */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center">
              <Trophy className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-light-100">{tournament.name}</h1>
              <span className="text-sm bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">
                {tournament.status}
              </span>
            </div>
          </div>
          
          <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-light-300 mb-1">Ends In</div>
              <div className="font-semibold text-light-100">{tournament.endsIn}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-light-300 mb-1">Participants</div>
              <div className="font-semibold text-light-100">{tournament.participants}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-light-300 mb-1">Prize Pool</div>
              <div className="font-semibold text-light-100">{tournament.prizePool}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-light-300 mb-1">Your Position</div>
              <div className="font-semibold text-light-100">#{tournament.yourPosition}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-light-100">Portfolio Performance</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-200 rounded-full">
              <TrendingUp size={16} className={tournament.return.startsWith('+') ? 'text-success-500' : 'text-error-500'} />
              <span className={`text-sm font-medium ${tournament.return.startsWith('+') ? 'text-success-500' : 'text-error-500'}`}>
                {tournament.return}
              </span>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-dark-400 rounded-lg mb-4 border border-dark-100">
            <BarChart3 size={36} className="text-light-300" />
            <span className="ml-2 text-light-300">Performance chart will appear here</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                <span className="text-sm text-light-100">Solana</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-light-300">{tournament.portfolio.solana.percentage}%</span>
                <span className="text-xs text-success-500">{tournament.portfolio.solana.return}</span>
              </div>
            </div>
            
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-secondary-500"></div>
                <span className="text-sm text-light-100">BNB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-light-300">{tournament.portfolio.bnb.percentage}%</span>
                <span className="text-xs text-error-500">{tournament.portfolio.bnb.return}</span>
              </div>
            </div>
            
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-accent-500"></div>
                <span className="text-sm text-light-100">Trump Coin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-light-300">{tournament.portfolio.trumpCoin.percentage}%</span>
                <span className="text-xs text-success-500">{tournament.portfolio.trumpCoin.return}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <h2 className="text-xl font-semibold text-light-100 mb-6">Top Performers</h2>
          
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-dark-400 rounded-lg p-4 border border-dark-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center text-sm font-medium text-light-100">
                      #{index + 1}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-light-100">Trader {index + 1}</div>
                      <div className="text-light-300">@trader{index + 1}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-success-500">+{(15 - index * 2).toFixed(1)}%</div>
                    <div className="text-xs text-light-300">Return</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament Rules */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <h2 className="text-xl font-semibold text-light-100 mb-4">Tournament Rules</h2>
        <div className="space-y-4 text-light-300">
          <p>
            This tournament follows a fixed portfolio allocation strategy. Once you set your initial portfolio, it cannot be changed until the tournament ends.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Entry fee is locked in the prize pool</li>
            <li>Portfolio performance is tracked using the Pyth oracle</li>
            <li>Winner receives 97% of the total prize pool</li>
            <li>Returns are calculated based on percentage gains</li>
            <li>Tournament ends automatically after the specified duration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailsPage;