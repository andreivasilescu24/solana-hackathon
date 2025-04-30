import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import {
  BarChart3,
  Trophy,
  LayoutDashboard,
  Users,
  User,
  LogOut,
  X,
} from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive
          ? "bg-primary-600 text-light-100"
          : "text-light-300 hover:text-light-100 hover:bg-dark-200"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { logout } = usePrivy();

  const isActive = (path: string) => location.pathname === path;

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark-400/80 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-dark-300 border-r border-dark-100 transition-transform lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 text-light-300 hover:text-light-100"
          onClick={closeSidebar}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6 border-b border-dark-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <BarChart3 className="text-white" size={16} />
          </div>
          <span className="font-bold text-lg text-light-100">
            WalletBattles
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              isActive={isActive("/dashboard")}
              onClick={closeSidebar}
            />
            <NavItem
              to="/tournaments"
              icon={<Trophy size={20} />}
              label="Tournaments"
              isActive={isActive("/tournaments")}
              onClick={closeSidebar}
            />
            <NavItem
              to="/portfolio"
              icon={<BarChart3 size={20} />}
              label="My Portfolio"
              isActive={isActive("/portfolio")}
              onClick={closeSidebar}
            />
            <NavItem
              to="/leaderboard"
              icon={<Users size={20} />}
              label="Leaderboard"
              isActive={isActive("/leaderboard")}
              onClick={closeSidebar}
            />
          </div>

          <div className="mt-10 pt-6 border-t border-dark-100 space-y-1">
            <NavItem
              to="/profile"
              icon={<User size={20} />}
              label="Profile"
              isActive={isActive("/profile")}
              onClick={closeSidebar}
            />
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-light-300 hover:text-light-100 hover:bg-dark-200 w-full text-left"
              onClick={() => {
                logout();
                closeSidebar();
              }}
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
