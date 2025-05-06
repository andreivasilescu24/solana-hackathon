import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Trophy,
  BarChart3,
  Clock,
  Shield,
  Twitter,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      try {
        await login();
        // Privy will handle the redirect after successful login
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:24px_24px] opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-radial from-primary-500/20 via-transparent to-transparent"></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-light-100 to-accent-400 text-transparent bg-clip-text">
              Compete in Crypto Trading Tournaments
            </h1>
            <p className="text-xl text-light-300 mb-8">
              Test your trading skills, compete with others, and win prizes in
              our crypto trading tournaments.
            </p>
            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className={`
                inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium
                transition-all duration-300 transform hover:scale-105
                ${
                  isLoading
                    ? "bg-dark-200 text-light-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 hover:from-secondary-600 hover:to-primary-600"
                }
              `}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-light-100"></div>
              ) : (
                <>
                  <Twitter className="mr-2 h-5 w-5" />
                  {isAuthenticated ? "Go to Dashboard" : "Sign in with Twitter"}
                  {!isAuthenticated && <ArrowRight className="ml-2 h-5 w-5" />}
                </>
              )}
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="bg-dark-200 border border-dark-100 rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Win Prizes
              </h3>
              <p className="text-light-300">
                Compete for real crypto prizes in our trading tournaments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-dark-200 border border-dark-100 rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Track Performance
              </h3>
              <p className="text-light-300">
                Monitor your trading performance and portfolio in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-dark-200 border border-dark-100 rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-accent-500/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Time-based Rounds
              </h3>
              <p className="text-light-300">
                Participate in tournaments with different durations and
                strategies.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-dark-200 border border-dark-100 rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-success-500/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Secure Platform
              </h3>
              <p className="text-light-300">
                Trade with confidence on our secure and reliable platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
