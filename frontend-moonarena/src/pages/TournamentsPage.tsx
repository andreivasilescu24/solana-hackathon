import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Clock, Wallet, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const TournamentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-light-100 mb-2">Tournaments</h1>
            <p className="text-light-300">
              Join active tournaments or browse upcoming competitions to showcase your trading skills.
            </p>
          </div>
        </div>
      </div>

      {/* Active Tournaments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-light-100">Active Tournaments</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Tournament 1 */}
          <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-light-100">Summer Crypto Cup</h3>
                <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-light-300" />
                  <span className="text-light-300">Ends in:</span>
                </div>
                <span className="text-light-100 font-medium">3d 12h</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-light-300" />
                  <span className="text-light-300">Participants:</span>
                </div>
                <span className="text-light-100 font-medium">324</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-light-300" />
                  <span className="text-light-300">Prize Pool:</span>
                </div>
                <span className="text-light-100 font-medium">8.5 ETH</span>
              </div>
            </div>
            
            <Link to="/tournaments/1">
              <Button className="w-full flex items-center justify-center gap-2">
                View Details
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {/* Tournament 2 */}
          <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-600 flex items-center justify-center">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-light-100">Altcoin Challenge</h3>
                <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-light-300" />
                  <span className="text-light-300">Ends in:</span>
                </div>
                <span className="text-light-100 font-medium">5d 8h</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-light-300" />
                  <span className="text-light-300">Participants:</span>
                </div>
                <span className="text-light-100 font-medium">156</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-light-300" />
                  <span className="text-light-300">Prize Pool:</span>
                </div>
                <span className="text-light-100 font-medium">4.2 ETH</span>
              </div>
            </div>
            
            <Link to="/tournaments/2">
              <Button className="w-full flex items-center justify-center gap-2">
                View Details
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Tournaments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-light-100">Upcoming Tournaments</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Tournament 1 */}
          <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-600/20 flex items-center justify-center">
                <Trophy className="text-primary-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-light-100">Winter Crypto Cup</h3>
                <span className="text-xs bg-secondary-600/20 text-secondary-400 px-2 py-1 rounded-full">Upcoming</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-light-300" />
                  <span className="text-light-300">Starts:</span>
                </div>
                <span className="text-light-100 font-medium">Dec 15, 2025</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-light-300" />
                  <span className="text-light-300">Duration:</span>
                </div>
                <span className="text-light-100 font-medium">14 days</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-light-300" />
                  <span className="text-light-300">Entry Fee:</span>
                </div>
                <span className="text-light-100 font-medium">0.05 ETH</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Remind Me
            </Button>
          </div>

          {/* Tournament 2 */}
          <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-600/20 flex items-center justify-center">
                <Trophy className="text-accent-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-light-100">Meme Coin Madness</h3>
                <span className="text-xs bg-secondary-600/20 text-secondary-400 px-2 py-1 rounded-full">Upcoming</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-light-300" />
                  <span className="text-light-300">Starts:</span>
                </div>
                <span className="text-light-100 font-medium">Nov 10, 2025</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-light-300" />
                  <span className="text-light-300">Duration:</span>
                </div>
                <span className="text-light-100 font-medium">7 days</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-light-300" />
                  <span className="text-light-300">Entry Fee:</span>
                </div>
                <span className="text-light-100 font-medium">0.02 ETH</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Remind Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;