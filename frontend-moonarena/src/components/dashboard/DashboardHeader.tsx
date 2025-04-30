import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Bell, User, Wallet } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  const { user } = usePrivy();
  
  return (
    <header className="bg-dark-300 border-b border-dark-100 py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-light-100">
          {window.location.pathname === '/dashboard' && 'Dashboard'}
          {window.location.pathname === '/tournaments' && 'Tournaments'}
          {window.location.pathname.startsWith('/tournaments/') && 'Tournament Details'}
          {window.location.pathname === '/portfolio' && 'My Portfolio'}
          {window.location.pathname === '/leaderboard' && 'Leaderboard'}
          {window.location.pathname === '/profile' && 'Profile'}
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Wallet Balance */}
          <div className="hidden md:flex items-center gap-2 bg-dark-200 text-light-100 px-3 py-1.5 rounded-full">
            <Wallet size={16} className="text-primary-500" />
            <span className="text-sm font-medium">2.45 ETH</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-light-300 hover:text-light-100 transition-colors rounded-full hover:bg-dark-200">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-dark-100 flex items-center justify-center overflow-hidden">
              {user?.twitter?.profilePictureUrl ? (
                <img 
                  src={user.twitter.profilePictureUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={16} className="text-light-300" />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-light-100">
                {user?.twitter?.username ? `@${user.twitter.username}` : 'User'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;