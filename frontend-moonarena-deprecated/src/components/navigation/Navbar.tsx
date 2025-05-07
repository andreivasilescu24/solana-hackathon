import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { TrendingUp, Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { scrollToSection } from "../../utils/scrollUtils";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { authenticated, login } = usePrivy();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on dashboard routes
  if (
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/tournaments") ||
    location.pathname.startsWith("/portfolio") ||
    location.pathname.startsWith("/leaderboard") ||
    location.pathname.startsWith("/profile")
  ) {
    return null;
  }

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-300/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <TrendingUp className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl text-light-100">
            WalletBattles
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            onClick={(e) => handleScrollClick(e, "features")}
            className="text-light-200 hover:text-light-100 transition-colors"
          >
            Features
          </a>
          <a
            href="#tournaments"
            onClick={(e) => handleScrollClick(e, "tournaments")}
            className="text-light-200 hover:text-light-100 transition-colors"
          >
            Tournaments
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollClick(e, "how-it-works")}
            className="text-light-200 hover:text-light-100 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={(e) => handleScrollClick(e, "faq")}
            className="text-light-200 hover:text-light-100 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          {authenticated ? (
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Button onClick={() => login()}>Sign In with Twitter</Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-light-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-300/95 backdrop-blur-md py-4 px-4 shadow-md">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              onClick={(e) => handleScrollClick(e, "features")}
              className="text-light-200 hover:text-light-100 transition-colors py-2"
            >
              Features
            </a>
            <a
              href="#tournaments"
              onClick={(e) => handleScrollClick(e, "tournaments")}
              className="text-light-200 hover:text-light-100 transition-colors py-2"
            >
              Tournaments
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollClick(e, "how-it-works")}
              className="text-light-200 hover:text-light-100 transition-colors py-2"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollClick(e, "faq")}
              className="text-light-200 hover:text-light-100 transition-colors py-2"
            >
              FAQ
            </a>

            {authenticated ? (
              <Link to="/dashboard" className="w-full py-2">
                <Button className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <Button onClick={() => login()} className="w-full">
                Sign In with Twitter
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
