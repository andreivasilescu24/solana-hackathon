import React from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-400 bg-grid-pattern bg-[length:24px_24px] p-4">
      <Link to="/" className="absolute top-6 left-6 text-light-300 hover:text-light-100 transition-colors flex items-center gap-2">
        <ArrowLeft size={20} />
        <span>Back to home</span>
      </Link>
      <div className="w-full max-w-md relative z-10">
        <Outlet />
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent z-0"></div>
    </div>
  );
};

export default AuthLayout;