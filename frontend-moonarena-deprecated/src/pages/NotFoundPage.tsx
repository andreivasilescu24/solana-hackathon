import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-400 bg-grid-pattern bg-[length:24px_24px] p-4">
      <div className="max-w-lg text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-500 mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-light-100 mb-4">Page Not Found</h2>
        <p className="text-light-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} />
          <span>Go Back</span>
        </Button>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent z-0"></div>
    </div>
  );
};

export default NotFoundPage;