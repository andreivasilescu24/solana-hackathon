import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Twitter, Wallet } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMenuOpen(false);
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-dark-200 border-b border-dark-300 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Moon Arena" className="h-10 w-10" />
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
                className="text-light-300 hover:text-light-100 transition-colors"
              >
                Dashboard
              </Link>

              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 text-light-300 hover:text-light-100 transition-colors"
                >
                  <div className="flex items-center">
                    {user?.displayName && (
                      <>
                        <Twitter className="h-4 w-4 text-primary-400 mr-2" />
                        <span className="font-medium mr-3">
                          {user?.displayName}
                        </span>
                      </>
                    )}
                    {user?.publicKey && (
                      <>
                        <Wallet className="h-4 w-4 text-secondary-400 mr-2" />
                        <span className="font-medium text-sm text-light-300">
                          {formatAddress(user?.publicKey)}
                        </span>
                      </>
                    )}
                  </div>
                  <User className="h-5 w-5 ml-2" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-100 border border-dark-300">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-light-300 hover:bg-dark-200 hover:text-light-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
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
              onClick={() => navigate("/")}
              className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-secondary-500 to-primary-500 text-light-100 hover:from-secondary-600 hover:to-primary-600 transition-all duration-300"
            >
              <Twitter className="h-5 w-5 mr-2" />
              Sign in with Twitter
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
                    {user.displayName && (
                      <div className="flex items-center mb-2">
                        <Twitter className="h-4 w-4 text-primary-400 mr-2" />
                        <span className="font-medium">{user.displayName}</span>
                      </div>
                    )}
                    {user.publicKey && (
                      <div className="flex items-center text-light-300">
                        <Wallet className="h-4 w-4 text-secondary-400 mr-2" />
                        <span className="font-medium text-sm">
                          {formatAddress(user.publicKey)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-light-300 hover:text-light-100 hover:bg-dark-200"
                  onClick={() => setMenuOpen(false)}
                >
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
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
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
