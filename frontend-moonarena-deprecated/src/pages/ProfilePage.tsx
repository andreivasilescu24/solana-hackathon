import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { User, Trophy, Wallet, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user, logout } = usePrivy();
  
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-dark-100 flex items-center justify-center overflow-hidden">
            {user?.twitter?.profilePictureUrl ? (
              <img 
                src={user.twitter.profilePictureUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={32} className="text-light-300" />
            )}
          </div>
          
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-light-100 mb-2">
              {user?.twitter?.username ? `@${user.twitter.username}` : 'Anonymous Trader'}
            </h1>
            <p className="text-light-300 mb-4">
              Joined December 2025 • 5 tournaments completed
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">Edit Profile</Button>
              <Button variant="outline" size="sm" onClick={() => logout()}>Sign Out</Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 bg-dark-200 px-6 py-4 rounded-lg">
            <Trophy size={24} className="text-primary-500" />
            <div className="text-2xl font-bold text-light-100">#24</div>
            <div className="text-sm text-light-300">Global Rank</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-600/20 flex items-center justify-center">
              <Trophy size={24} className="text-primary-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-light-100">3</div>
              <div className="text-sm text-light-300">Tournaments Won</div>
            </div>
          </div>
          <div className="text-sm text-light-300">
            Win Rate: <span className="text-light-100">60%</span>
          </div>
        </div>

        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-secondary-600/20 flex items-center justify-center">
              <Wallet size={24} className="text-secondary-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-light-100">12.5 ETH</div>
              <div className="text-sm text-light-300">Total Earnings</div>
            </div>
          </div>
          <div className="text-sm text-light-300">
            Last win: <span className="text-light-100">2.4 ETH</span>
          </div>
        </div>

        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-600/20 flex items-center justify-center">
              <Clock size={24} className="text-accent-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-light-100">5</div>
              <div className="text-sm text-light-300">Tournaments Completed</div>
            </div>
          </div>
          <div className="text-sm text-light-300">
            Active now: <span className="text-light-100">2</span>
          </div>
        </div>

        <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-success-600/20 flex items-center justify-center">
              <Trophy size={24} className="text-success-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-light-100">+25.4%</div>
              <div className="text-sm text-light-300">Best Return</div>
            </div>
          </div>
          <div className="text-sm text-light-300">
            Tournament: <span className="text-light-100">Summer Cup</span>
          </div>
        </div>
      </div>

      {/* Tournament History */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <h2 className="text-xl font-semibold text-light-100 mb-6">Tournament History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-light-300 text-sm">
                <th className="text-left pb-4">Tournament</th>
                <th className="text-left pb-4">Date</th>
                <th className="text-right pb-4">Position</th>
                <th className="text-right pb-4">Return</th>
                <th className="text-right pb-4">Prize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <Trophy size={16} className="text-white" />
                    </div>
                    <span className="text-light-100">Spring Crypto Cup</span>
                  </div>
                </td>
                <td className="py-4 text-light-300">Mar 15, 2025</td>
                <td className="text-right py-4">
                  <span className="text-success-500 font-medium">#1</span>
                </td>
                <td className="text-right py-4 text-success-500">+25.4%</td>
                <td className="text-right py-4 text-light-100">4.8 ETH</td>
              </tr>
              
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center">
                      <Trophy size={16} className="text-white" />
                    </div>
                    <span className="text-light-100">DeFi Masters</span>
                  </div>
                </td>
                <td className="py-4 text-light-300">Feb 28, 2025</td>
                <td className="text-right py-4">
                  <span className="text-primary-500 font-medium">#3</span>
                </td>
                <td className="text-right py-4 text-success-500">+18.2%</td>
                <td className="text-right py-4 text-light-100">2.4 ETH</td>
              </tr>
              
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center">
                      <Trophy size={16} className="text-white" />
                    </div>
                    <span className="text-light-100">Altcoin Rush</span>
                  </div>
                </td>
                <td className="py-4 text-light-300">Jan 15, 2025</td>
                <td className="text-right py-4">
                  <span className="text-light-300 font-medium">#12</span>
                </td>
                <td className="text-right py-4 text-error-500">-5.4%</td>
                <td className="text-right py-4 text-light-300">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;