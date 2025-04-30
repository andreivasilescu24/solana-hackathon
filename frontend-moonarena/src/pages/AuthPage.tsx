import React from "react";
import { Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { Twitter, TrendingUp } from "lucide-react";
import Button from "../components/ui/Button";

const AuthPage: React.FC = () => {
  const { login, authenticated, ready } = usePrivy();

  // Redirect to dashboard if already authenticated
  if (ready && authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-dark-300 rounded-xl shadow-xl border border-dark-100 overflow-hidden">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <TrendingUp className="text-white" size={28} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-light-100 mb-2">
          Welcome to WalletBattles
        </h1>
        <p className="text-center text-light-300 mb-8">
          Sign in with Twitter to participate in crypto trading tournaments and
          win prizes!
        </p>

        <Button
          onClick={() => login()}
          className="w-full flex items-center justify-center gap-2 py-3"
        >
          <Twitter size={20} />
          <span>Sign in with Twitter</span>
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-light-300">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div className="p-6 bg-dark-400 border-t border-dark-100">
        <h3 className="font-medium text-light-100 mb-3">What you'll get:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="text-xs text-primary-500">✓</span>
            </div>
            <span className="text-sm text-light-300">
              Secure embedded wallet generated automatically
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="text-xs text-primary-500">✓</span>
            </div>
            <span className="text-sm text-light-300">
              Access to all crypto trading tournaments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="text-xs text-primary-500">✓</span>
            </div>
            <span className="text-sm text-light-300">
              Ability to create ideal portfolios and compete for prizes
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthPage;
