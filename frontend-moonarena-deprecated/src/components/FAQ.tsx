import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is WalletBattles?",
    answer:
      "WalletBattles is a platform for cryptocurrency trading tournaments where users can compete against each other by creating and managing virtual portfolios. The platform uses real-time price data to track performance and determine winners.",
  },
  {
    question: "How do I participate in tournaments?",
    answer:
      "To participate, you need to sign up with your Twitter account, which will automatically generate your embedded wallet. Then, you can browse available tournaments, pay the entry fee, and create your portfolio allocation.",
  },
  {
    question: "How are winners determined?",
    answer:
      "Winners are determined based on the percentage return of their portfolio during the tournament period. The participant with the highest return at the end of the tournament wins 97% of the prize pool.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Yes, all transactions are secured on the blockchain. Your entry fees are locked in the prize pool smart contract, and winnings are automatically distributed to the winner's wallet at the end of the tournament.",
  },
  {
    question: "Can I change my portfolio during a tournament?",
    answer:
      "No, once you set your initial portfolio allocation, it cannot be changed until the tournament ends. This ensures fair competition and tests your initial strategy.",
  },
  {
    question: "How are cryptocurrency prices tracked?",
    answer:
      "We use the Pyth oracle to track real-time cryptocurrency prices directly from the blockchain, ensuring accurate and reliable price data for tournament calculations.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-dark-400">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-100">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-light-300">
            Find answers to common questions about WalletBattles and how our
            tournaments work.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-dark-300 rounded-lg border border-dark-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-medium text-light-100">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-light-300" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-light-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
