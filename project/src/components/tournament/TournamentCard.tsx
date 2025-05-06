import React from "react";
import { Link } from "react-router-dom";
import { Clock, User, Award, Coins } from "lucide-react";
import { Tournament, TournamentStatus } from "../../types";
import {
  formatCurrency,
  formatTimeLeft,
  getTournamentStatus,
} from "../../utils/formatters";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const status = getTournamentStatus(tournament);

  const getStatusColor = () => {
    switch (status) {
      case TournamentStatus.UPCOMING:
        return "bg-dark-100 text-light-200";
      case TournamentStatus.REGISTRATION:
        return "bg-accent-900/50 text-accent-400";
      case TournamentStatus.ACTIVE:
        return "bg-success-900/50 text-success-400";
      case TournamentStatus.COMPLETED:
      case TournamentStatus.FINALIZED:
        return "bg-primary-900/50 text-primary-400";
      default:
        return "bg-dark-100 text-light-200";
    }
  };

  return (
    <div className="bg-dark-200 rounded-lg border border-dark-100 overflow-hidden transition-all hover:shadow-lg hover:shadow-primary-500/10 h-[24rem] flex flex-col">
      <div className="relative">
        {/* Random gradient background based on tournament id */}
        <div
          className="h-24 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, 
              hsl(${parseInt(tournament.id.substr(-3), 16) % 360}, 70%, 55%), 
              hsl(${
                (parseInt(tournament.id.substr(-3), 16) + 40) % 360
              }, 70%, 55%))`,
          }}
        ></div>

        <div className="absolute top-3 right-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {status}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-light-100">
          {tournament.name || `Tournament #${tournament.id.substring(0, 8)}`}
        </h3>

        <p className="text-light-200 mb-4 line-clamp-2 text-sm">
          {tournament.description ||
            "Compete with other traders to see who can achieve the highest returns."}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <Coins className="h-4 w-4 text-secondary-400 mr-2" />
            <div>
              <p className="text-xs text-light-300">Entry Fee</p>
              <p className="font-medium text-light-100 text-sm">
                {formatCurrency(tournament.entryFee)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Award className="h-4 w-4 text-secondary-400 mr-2" />
            <div>
              <p className="text-xs text-light-300">Prize Pool</p>
              <p className="font-medium text-light-100 text-sm">
                {formatCurrency(tournament.prizePool)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 text-secondary-400 mr-2" />
            <div>
              <p className="text-xs text-light-300">Time Left</p>
              <p className="font-medium text-light-100 text-sm">
                {formatTimeLeft(tournament)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <User className="h-4 w-4 text-secondary-400 mr-2" />
            <div>
              <p className="text-xs text-light-300">Participants</p>
              <p className="font-medium text-light-100 text-sm">
                {tournament.currentUsers} / {tournament.maxUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            to={`/tournaments/${tournament.id}`}
            className="block w-full text-center py-2 rounded-md bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 font-medium hover:from-secondary-600 hover:to-primary-600 transition-all duration-300 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
