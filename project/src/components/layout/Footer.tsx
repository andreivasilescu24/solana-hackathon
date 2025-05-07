import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Twitter, Github as GitHub } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-300 text-light-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Trophy className="h-8 w-8 text-primary-300" />
              <span className="text-xl font-bold text-light-200">
                Moon Arena
              </span>
            </Link>
            <p className="text-light-200 max-w-md">
              Compete in crypto trading tournaments to showcase your portfolio
              management skills and win prizes.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-light-200 hover:text-primary-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-light-200 hover:text-primary-300 transition-colors"
              >
                <GitHub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-200">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-200 hover:text-primary-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-200 mt-8 pt-8 text-center text-light-300">
          <p>&copy; {currentYear} MoonArena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
