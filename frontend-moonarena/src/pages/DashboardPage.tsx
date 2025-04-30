import React from 'react';
import { Link } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { 
  Trophy, 
  BarChart3, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Wallet,
  ArrowRight,
  Clock,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { user } = usePrivy();
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-light-100 mb-2">
              Welcome back, {user?.twitter?.username ? `@${user.twitter.username}` : 'Trader'}!
            </h1>
            <p className="text-light-300">
              Your crypto trading journey continues. Check your tournament status and portfolio performance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/tournaments">
              <Button className="w-full sm:w-auto">View Tournaments</Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="w-full sm:w-auto">My Portfolio</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Tournaments */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-600/20 flex items-center justify-center">
              <Trophy size={24} className="text-primary-500" />
            </div>
            <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-light-100 mb-1">2</h3>
          <p className="text-light-300">Active tournaments</p>
        </div>

        {/* Portfolio Performance */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-success-600/20 flex items-center justify-center">
              <TrendingUp size={24} className="text-success-500" />
            </div>
            <span className="text-xs bg-success-600/20 text-success-400 px-2 py-1 rounded-full">Trending</span>
          </div>
          <h3 className="text-2xl font-bold text-light-100 mb-1">+12.8%</h3>
          <p className="text-light-300">Best portfolio performance</p>
        </div>

        {/* Wallet Balance */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-600/20 flex items-center justify-center">
              <Wallet size={24} className="text-accent-500" />
            </div>
            <span className="text-xs bg-accent-600/20 text-accent-400 px-2 py-1 rounded-full">Available</span>
          </div>
          <h3 className="text-2xl font-bold text-light-100 mb-1">2.45 ETH</h3>
          <p className="text-light-300">Wallet balance</p>
        </div>

        {/* Ranking */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-secondary-600/20 flex items-center justify-center">
              <Users size={24} className="text-secondary-500" />
            </div>
            <span className="text-xs bg-secondary-600/20 text-secondary-400 px-2 py-1 rounded-full">Rank</span>
          </div>
          <h3 className="text-2xl font-bold text-light-100 mb-1">#24</h3>
          <p className="text-light-300">Global ranking</p>
        </div>
      </div>

      {/* Active Tournaments */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-light-100">Active Tournaments</h2>
          <Link to="/tournaments" className="text-primary-400 hover:text-primary-300 flex items-center gap-1 text-sm">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="space-y-4">
          {/* Tournament 1 */}
          <div className="bg-dark-400 rounded-lg p-4 border border-dark-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <Trophy size={16} className="text-white" />
                  </div>
                  <h3 className="font-medium text-light-100">Summer Crypto Cup</h3>
                  <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-light-300" />
                    <span className="text-light-300">Ends in 3d 12h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-light-300" />
                    <span className="text-light-300">324 participants</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wallet size={14} className="text-light-300" />
                    <span className="text-light-300">8.5 ETH prize pool</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-light-300 mb-1">Your position</div>
                  <div className="text-xl font-semibold text-light-100">#15</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-dark-300 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1 text-success-500">
                    <TrendingUp size={14} />
                    <span className="font-medium">+8.3%</span>
                  </div>
                  <span className="text-xs text-light-300">Return</span>
                </div>
                <Link to="/tournaments/1">
                  <Button size="sm">View</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tournament 2 */}
          <div className="bg-dark-400 rounded-lg p-4 border border-dark-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center">
                    <Trophy size={16} className="text-white" />
                  </div>
                  <h3 className="font-medium text-light-100">Altcoin Challenge</h3>
                  <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-light-300" />
                    <span className="text-light-300">Ends in 5d 8h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-light-300" />
                    <span className="text-light-300">156 participants</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wallet size={14} className="text-light-300" />
                    <span className="text-light-300">4.2 ETH prize pool</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-light-300 mb-1">Your position</div>
                  <div className="text-xl font-semibold text-light-100">#42</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-dark-300 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1 text-error-500">
                    <TrendingDown size={14} />
                    <span className="font-medium">-2.1%</span>
                  </div>
                  <span className="text-xs text-light-300">Return</span>
                </div>
                <Link to="/tournaments/2">
                  <Button size="sm">View</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <div className="lg:col-span-2 bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-light-100">Portfolio Performance</h2>
            <Link to="/portfolio" className="text-primary-400 hover:text-primary-300 flex items-center gap-1 text-sm">
              View details <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-dark-400 rounded-lg mb-4 border border-dark-100">
            <BarChart3 size={36} className="text-light-300" />
            <span className="ml-2 text-light-300">Portfolio chart will appear here</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                <span className="text-sm text-light-100">Solana</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-light-300">30%</span>
                <span className="text-xs text-success-500">+12.5%</span>
              </div>
            </div>
            
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-secondary-500"></div>
                <span className="text-sm text-light-100">BNB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-light-300">15%</span>
                <span className="text-xs text-error-500">-3.2%</span>
              </div>
            </div>
            
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-accent-500"></div>
                <span className="text-sm text-light-100">Trump Coin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-light-300">55%</span>
                <span className="text-xs text-success-500">+8.7%</span>
              </div>
            </div>
            
            <div className="bg-dark-400 p-3 rounded-lg border border-dark-100">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-light-300"></div>
                <span className="text-sm text-light-100">Total</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-success-500">+6.8%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Tournaments */}
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <h2 className="text-xl font-semibold text-light-100 mb-6">Upcoming Tournaments</h2>
          
          <div className="space-y-4">
            <div className="bg-dark-400 rounded-lg p-4 border border-dark-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center">
                  <Trophy size={16} className="text-primary-500" />
                </div>
                <h3 className="font-medium text-light-100">Winter Crypto Cup</h3>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Start date:</span>
                  <span className="text-light-100">Dec 15, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Entry fee:</span>
                  <span className="text-light-100">0.05 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Duration:</span>
                  <span className="text-light-100">14 days</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Remind Me</Button>
            </div>
            
            <div className="bg-dark-400 rounded-lg p-4 border border-dark-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent-600/20 flex items-center justify-center">
                  <Trophy size={16} className="text-accent-500" />
                </div>
                <h3 className="font-medium text-light-100">Meme Coin Madness</h3>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Start date:</span>
                  <span className="text-light-100">Nov 10, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Entry fee:</span>
                  <span className="text-light-100">0.02 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Duration:</span>
                  <span className="text-light-100">7 days</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Remind Me</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips and Notifications */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-warning-600/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle size={20} className="text-warning-500" />
          </div>
          <div>
            <h3 className="font-medium text-light-100 mb-1">Trading Tips</h3>
            <p className="text-light-300">
              Remember, diversification is key to managing risk. Consider allocating your portfolio across different types of assets rather than focusing on a single cryptocurrency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;