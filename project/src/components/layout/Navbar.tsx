import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Twitter, Wallet, Copy, Check, LayoutDashboard, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface LinkedAccount {
  type: string;
  username?: string;
  email?: string;
}

interface PrivyUser {
  linkedAccounts?: LinkedAccount[];
  publicKey?: string;
}

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get user display info
  const getUserDisplayInfo = () => {
    if (!user) return null;
    
    // Check for linked accounts
    const linkedAccounts = (user as PrivyUser).linkedAccounts || [];
    const twitterAccount = linkedAccounts.find((account: LinkedAccount) => account.type === 'twitter');
    const emailAccount = linkedAccounts.find((account: LinkedAccount) => account.type === 'email');
    
    if (twitterAccount) {
      return {
        icon: <Twitter className="h-4 w-4 mr-2" />,
        name: twitterAccount.username || 'Twitter User'
      };
    } else if (emailAccount) {
      return {
        icon: <Mail className="h-4 w-4 mr-2" />,
        name: emailAccount.email?.split('@')[0] || 'Email User'
      };
    }
    
    return null;
  };

  const userInfo = getUserDisplayInfo();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <nav className="bg-dark-200 border-b border-dark-300 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo-moon.png" alt="Moon Arena" className="h-10 w-10" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary-400 via-light-100 to-accent-400 text-transparent bg-clip-text">
            Moon Arena
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center text-light-300 hover:text-light-100 transition-colors"
              >
                <LayoutDashboard className="h-5 w-5 mr-2 text-light-100" />
                Dashboard
              </Link>

              <div className="relative">
                <div className="flex items-center space-x-2">
                  {user?.publicKey && (
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 text-secondary-400 mr-2" />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(user.publicKey);
                        }}
                        className="flex items-center font-medium text-sm text-light-300 hover:text-light-100 transition-colors"
                      >
                        <span>{formatAddress(user.publicKey)}</span>
                        {copied ? (
                          <Check className="h-4 w-4 ml-2 text-success-400" />
                        ) : (
                          <Copy className="h-4 w-4 ml-2 opacity-50 hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  )}
                  <button
                    onClick={toggleMenu}
                    className="flex items-center text-light-300 hover:text-light-100 transition-colors ml-2"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </div>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-100 border border-dark-300">
                    <div className="py-1">
                      {userInfo && (
                        <div className="flex items-center px-4 py-2 text-sm text-light-300">
                          {userInfo.icon}
                          <span className="truncate">{userInfo.name}</span>
                        </div>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-error-400 hover:bg-dark-200 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 hover:from-secondary-600 hover:to-primary-600 transition-all duration-300"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Sign in
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-light-300 hover:text-light-100"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-dark-100 border-t border-dark-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {user && (
                  <div className="px-3 py-2 text-sm">
                    {user.publicKey && (
                      <div className="flex items-center text-light-300">
                        <Wallet className="h-4 w-4 text-secondary-400 mr-2" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(user.publicKey);
                          }}
                          className="flex items-center font-medium text-sm text-light-300 hover:text-light-100 transition-colors"
                        >
                          <span>{formatAddress(user.publicKey)}</span>
                          {copied ? (
                            <Check className="h-4 w-4 ml-2 text-success-400" />
                          ) : (
                            <Copy className="h-4 w-4 ml-2 opacity-50 hover:opacity-100" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-light-300 hover:text-light-100 hover:bg-dark-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2 text-light-100" />
                  Dashboard
                </Link>
                <Link
                  to="/tournaments"
                  className="block px-3 py-2 rounded-md text-base font-medium text-light-300 hover:text-light-100 hover:bg-dark-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Tournaments
                </Link>
                <Link
                  to="/leaderboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-light-300 hover:text-light-100 hover:bg-dark-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-light-300 hover:text-light-100 hover:bg-dark-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-error-400 hover:bg-dark-200 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 hover:from-secondary-600 hover:to-primary-600 flex items-center justify-center"
              >
                <Twitter className="h-5 w-5 mr-2" />
                Sign in with Twitter
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
