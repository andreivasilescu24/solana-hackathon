import React from "react";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import {
  Trophy,
  BarChart3,
  Wallet,
  Lock,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HomePage: React.FC = () => {
  const { authenticated, login } = usePrivy();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-dark-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:24px_24px] opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-radial from-primary-500/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-dark-400/80 backdrop-blur-sm text-primary-400 px-4 py-2 rounded-full mb-6"
            >
              <Trophy size={16} />
              <span className="text-sm font-medium">
                The Ultimate Crypto Trading Competition
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-light-100 to-accent-400 text-transparent bg-clip-text"
            >
              Compete. Trade. Win.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-xl text-light-300 mb-8"
            >
              Join our crypto trading tournaments to showcase your trading
              skills, build your ideal portfolio, and compete for impressive
              rewards.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {authenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={() => login()}
                  className="w-full sm:w-auto"
                >
                  Sign In with Twitter
                </Button>
              )}
              <Link to="/#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Floating Cards */}
          <div className="relative mt-16 h-80 md:h-96">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-80 bg-dark-200 rounded-2xl p-4 border border-dark-100 shadow-xl animate-float"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <Trophy size={16} className="text-white" />
                  </div>
                  <h3 className="font-medium text-light-100">
                    Summer Crypto Cup
                  </h3>
                </div>
                <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Prize Pool:</span>
                  <span className="text-light-100 font-medium">8.5 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Participants:</span>
                  <span className="text-light-100 font-medium">324</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Ends in:</span>
                  <span className="text-light-100 font-medium">3d 12h 45m</span>
                </div>
              </div>
              <div className="mt-4 bg-dark-300 h-20 rounded-lg flex items-center justify-center">
                <BarChart3 size={36} className="text-primary-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-10 right-8 md:right-16 w-56 md:w-64 bg-dark-200 rounded-2xl p-4 border border-dark-100 shadow-xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center">
                  <Wallet size={16} className="text-white" />
                </div>
                <h3 className="font-medium text-light-100">Your Wallet</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-dark-300 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-500"></div>
                      <span className="text-light-100">ETH</span>
                    </div>
                    <span className="text-light-100 font-medium">2.45</span>
                  </div>
                </div>
                <div className="bg-dark-300 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-500"></div>
                      <span className="text-light-100">SOL</span>
                    </div>
                    <span className="text-light-100 font-medium">18.72</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute top-20 left-8 md:left-16 w-56 md:w-64 bg-dark-200 rounded-2xl p-4 border border-dark-100 shadow-xl animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <BarChart3 size={16} className="text-white" />
                </div>
                <h3 className="font-medium text-light-100">Your Portfolio</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Solana:</span>
                  <span className="text-success-500 font-medium">+12.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">BNB:</span>
                  <span className="text-error-500 font-medium">-3.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-300">Trump Coin:</span>
                  <span className="text-success-500 font-medium">+8.7%</span>
                </div>
              </div>
              <div className="mt-3 h-2 bg-dark-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-dark-400">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-100">
              Built for Crypto Enthusiasts
            </h2>
            <p className="text-xl text-light-300">
              Our platform combines the excitement of competitions with the
              strategic challenge of crypto trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
              <div className="w-12 h-12 rounded-lg bg-primary-600/20 flex items-center justify-center mb-4">
                <Trophy size={24} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-light-100">
                Fixed Tournaments
              </h3>
              <p className="text-light-300">
                Participate in tournaments with clear timeframes, entry fees,
                and prize pools. No surprises, just strategy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
              <div className="w-12 h-12 rounded-lg bg-secondary-600/20 flex items-center justify-center mb-4">
                <Wallet size={24} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-light-100">
                Embedded Wallets
              </h3>
              <p className="text-light-300">
                Seamless login with Twitter generates your secure embedded
                wallet - no complex setup required.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
              <div className="w-12 h-12 rounded-lg bg-accent-600/20 flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-light-100">
                Ideal Portfolio
              </h3>
              <p className="text-light-300">
                Create your perfect portfolio mix - allocate percentages across
                different cryptocurrencies and test your strategy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
              <div className="w-12 h-12 rounded-lg bg-success-600/20 flex items-center justify-center mb-4">
                <Zap size={24} className="text-success-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-light-100">
                Oracle Integration
              </h3>
              <p className="text-light-300">
                Tournament progress is tracked with Pyth oracle for reliable,
                real-time pricing data from the blockchain.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
              <div className="w-12 h-12 rounded-lg bg-warning-600/20 flex items-center justify-center mb-4">
                <Users size={24} className="text-warning-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-light-100">
                Competitive Leaderboard
              </h3>
              <p className="text-light-300">
                Track your position among competitors in real-time with our
                dynamic leaderboard system.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
              <div className="w-12 h-12 rounded-lg bg-error-600/20 flex items-center justify-center mb-4">
                <Lock size={24} className="text-error-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-light-100">
                Secure Rewards
              </h3>
              <p className="text-light-300">
                Tournament winners automatically receive 97% of the prize pool
                directly to their wallet. Safe and transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <FAQ />
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-dark-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-dark-300 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light-100">
                  Ready to Test Your Trading Skills?
                </h2>
                <p className="text-light-300 mb-6">
                  Join our next tournament and compete with traders from around
                  the world. Show off your strategy and win impressive rewards.
                </p>
                {authenticated ? (
                  <Link to="/tournaments">
                    <Button size="lg" className="flex items-center gap-2">
                      View Tournaments <ArrowRight size={18} />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => login()}
                    className="flex items-center gap-2"
                  >
                    Sign In with Twitter <ArrowRight size={18} />
                  </Button>
                )}
              </div>
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Trophy size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
