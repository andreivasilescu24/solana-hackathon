import { Tournament, TournamentStatus } from "../types";

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(3)} SOL`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTimeLeft = (tournament: Tournament): string => {
  const now = Date.now();

  // If the tournament hasn't started yet, show time until start
  if (now < tournament.startTime) {
    return formatDuration(tournament.startTime - now) + " until start";
  }

  // If the tournament is ongoing, show time until end
  if (now < tournament.endTime) {
    return formatDuration(tournament.endTime - now) + " left";
  }

  // If the tournament has ended
  return "Ended";
};

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return "Less than 1m";
};

export const getTournamentStatus = (
  tournament: Tournament
): TournamentStatus => {
  const now = Date.now();

  if (tournament.isFinalized) {
    return TournamentStatus.FINALIZED;
  }

  if (now > tournament.endTime) {
    return TournamentStatus.COMPLETED;
  }

  if (now >= tournament.startTime && now <= tournament.endTime) {
    return TournamentStatus.ACTIVE;
  }

  // If it's less than 24 hours until the start time, it's in registration phase
  if (tournament.startTime - now <= 24 * 60 * 60 * 1000) {
    return TournamentStatus.REGISTRATION;
  }

  return TournamentStatus.UPCOMING;
};
