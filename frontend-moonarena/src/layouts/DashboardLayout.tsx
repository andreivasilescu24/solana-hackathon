import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { Menu } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-dark-300">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed z-50 bottom-4 right-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-full bg-primary-600 text-light-100 shadow-lg hover:bg-primary-700 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 bg-dark-400">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;