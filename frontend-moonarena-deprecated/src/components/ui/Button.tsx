import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-300',
        {
          // Variants
          'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500': variant === 'primary',
          'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500': variant === 'secondary',
          'bg-transparent border border-light-300 text-light-100 hover:bg-dark-200 focus:ring-light-300': variant === 'outline',
          'bg-transparent text-light-100 hover:bg-dark-200 focus:ring-light-300': variant === 'ghost',
          'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500': variant === 'danger',
          
          // Sizes
          'text-xs px-2.5 py-1.5 rounded': size === 'sm',
          'text-sm px-4 py-2 rounded-md': size === 'md',
          'text-base px-6 py-3 rounded-md': size === 'lg',
          
          // Disabled state
          'opacity-60 cursor-not-allowed hover:bg-primary-600': disabled && variant === 'primary',
          'opacity-60 cursor-not-allowed hover:bg-secondary-600': disabled && variant === 'secondary',
          'opacity-60 cursor-not-allowed hover:bg-transparent': disabled && (variant === 'outline' || variant === 'ghost'),
          'opacity-60 cursor-not-allowed hover:bg-error-600': disabled && variant === 'danger',
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;