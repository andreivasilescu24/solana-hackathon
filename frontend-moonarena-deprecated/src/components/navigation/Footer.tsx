import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Twitter, Github, Linkedin } from "lucide-react";
import { scrollToSection } from "../../utils/scrollUtils";

const Footer: React.FC = () => {
  // Hide footer on auth and dashboard routes
  if (
    window.location.pathname.startsWith("/auth") ||
    window.location.pathname.startsWith("/dashboard") ||
    window.location.pathname.startsWith("/tournaments") ||
    window.location.pathname.startsWith("/portfolio") ||
    window.location.pathname.startsWith("/leaderboard") ||
    window.location.pathname.startsWith("/profile")
  ) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-dark-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <TrendingUp className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-light-100">
                WalletBattles
              </span>
            </Link>
            <p className="text-light-300 mb-4">
              The premier platform for cryptocurrency trading tournaments. Test
              your strategies, compete with others, and win prizes.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-light-300 hover:text-light-100 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-light-300 hover:text-light-100 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-light-300 hover:text-light-100 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-light-100 font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleScrollClick(e, "features")}
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#tournaments"
                  onClick={(e) => handleScrollClick(e, "tournaments")}
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  Tournaments
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollClick(e, "how-it-works")}
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollClick(e, "faq")}
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-light-100 font-semibold text-lg mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/support"
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-light-300 hover:text-light-100 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-light-100 font-semibold text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-light-300 mb-4">
              Subscribe to our newsletter for the latest tournament
              announcements and crypto insights.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-dark-300 text-light-100 px-4 py-2 rounded-l-md border border-dark-100 focus:outline-none focus:border-primary-500 flex-grow"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-light-100 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-100 pt-8 text-center text-light-300">
          <p>&copy; {currentYear} WalletBattles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
