import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-dark-300">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-100">
            How It Works
          </h2>
          <p className="text-xl text-light-300">
            Getting started with WalletBattles is easy. Follow these simple
            steps to join tournaments and compete.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-1 bg-gradient-to-b from-primary-500 to-accent-500 md:-translate-x-1/2 hidden md:block"></div>

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-12 relative">
              <div className="md:w-1/2 md:text-right md:pr-8 md:mr-auto">
                <h3 className="text-xl font-semibold mb-2 text-light-100">
                  Sign Up with Twitter
                </h3>
                <p className="text-light-300">
                  Connect with your Twitter account to automatically generate
                  your embedded wallet. No complex setup or additional accounts
                  needed.
                </p>
              </div>
              <div className="flex-none w-16 h-16 rounded-full bg-dark-200 border-4 border-primary-500 flex items-center justify-center z-10 mb-4 md:mb-0 md:mr-1">
                <span className="text-xl font-bold text-light-100">1</span>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-12 relative">
              <div className="md:w-1/2"></div>
              <div className="flex-none w-16 h-16 rounded-full bg-dark-200 border-4 border-primary-600 flex items-center justify-center z-10 mb-4 md:mb-0 md:ml-1">
                <span className="text-xl font-bold text-light-100">2</span>
              </div>
              <div className="md:w-1/2 md:text-left md:pl-8">
                <h3 className="text-xl font-semibold mb-2 text-light-100">
                  Fund Your Wallet
                </h3>
                <p className="text-light-300">
                  Add funds to your embedded wallet to participate in
                  tournaments. All transactions are secure and transparent on
                  the blockchain.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-12 relative">
              <div className="md:w-1/2 md:text-right md:pr-8 md:mr-auto">
                <h3 className="text-xl font-semibold mb-2 text-light-100">
                  Join a Tournament
                </h3>
                <p className="text-light-300">
                  Browse available tournaments, check entry fees and prize
                  pools, then enter the competition by paying the entry fee from
                  your wallet.
                </p>
              </div>
              <div className="flex-none w-16 h-16 rounded-full bg-dark-200 border-4 border-primary-700 flex items-center justify-center z-10 mb-4 md:mb-0 md:mr-1">
                <span className="text-xl font-bold text-light-100">3</span>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-12 relative">
              <div className="md:w-1/2"></div>
              <div className="flex-none w-16 h-16 rounded-full bg-dark-200 border-4 border-accent-500 flex items-center justify-center z-10 mb-4 md:mb-0 md:ml-1">
                <span className="text-xl font-bold text-light-100">4</span>
              </div>
              <div className="md:w-1/2 md:text-left md:pl-8">
                <h3 className="text-xl font-semibold mb-2 text-light-100">
                  Build Your Portfolio
                </h3>
                <p className="text-light-300">
                  Create your ideal portfolio by allocating percentages to
                  different cryptocurrencies. Choose wisely - your selections
                  determine your success!
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-start md:items-center relative">
              <div className="md:w-1/2 md:text-right md:pr-8 md:mr-auto">
                <h3 className="text-xl font-semibold mb-2 text-light-100">
                  Track & Win
                </h3>
                <p className="text-light-300">
                  Monitor your portfolio's performance on the leaderboard as the
                  tournament progresses. If you have the highest returns at the
                  end, you win 97% of the prize pool!
                </p>
              </div>
              <div className="flex-none w-16 h-16 rounded-full bg-dark-200 border-4 border-accent-600 flex items-center justify-center z-10 mb-4 md:mb-0">
                <span className="text-xl font-bold text-light-100">5</span>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
