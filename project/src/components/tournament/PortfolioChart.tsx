import React from 'react';
import { TokenAllocation } from '../../types';

interface PortfolioChartProps {
  allocations: TokenAllocation[];
  className?: string;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ allocations, className = '' }) => {
  // Generate colors based on token names (deterministic)
  const getColor = (token: string, index: number) => {
    const colors = [
      'bg-primary-500', 'bg-accent-500', 'bg-success-500', 
      'bg-warning-500', 'bg-error-500', 'bg-neutral-500',
      'bg-primary-600', 'bg-accent-600', 'bg-success-600',
      'bg-warning-600', 'bg-error-600', 'bg-neutral-600',
    ];
    
    // Use a simple hash of the token name to select a color
    const hash = [...token].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length] || colors[index % colors.length];
  };

  // Sort allocations by weight (descending)
  const sortedAllocations = [...allocations]
    .sort((a, b) => b.weight - a.weight);

  return (
    <div className={`${className}`}>
      {/* Pie chart visualization */}
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {sortedAllocations.length > 0 ? (
            <>
              {/* Generate pie slices */}
              {(() => {
                let cumulativePercent = 0;
                
                return sortedAllocations.map((allocation, index) => {
                  // SVG arc calculations
                  const startPercent = cumulativePercent;
                  const endPercent = startPercent + allocation.weight;
                  
                  // Convert to radians and calculate coordinates
                  const startX = 50 + 40 * Math.cos(2 * Math.PI * startPercent / 100);
                  const startY = 50 + 40 * Math.sin(2 * Math.PI * startPercent / 100);
                  const endX = 50 + 40 * Math.cos(2 * Math.PI * endPercent / 100);
                  const endY = 50 + 40 * Math.sin(2 * Math.PI * endPercent / 100);
                  
                  // Determine if the arc should take the long path around
                  const largeArcFlag = allocation.weight > 50 ? 1 : 0;
                  
                  const pathData = [
                    `M 50 50`,
                    `L ${startX} ${startY}`,
                    `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    'Z'
                  ].join(' ');
                  
                  cumulativePercent = endPercent;
                  
                  return (
                    <path
                      key={`${allocation.mint}-${index}`}
                      d={pathData}
                      fill={getColor(allocation.mint, index)}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  );
                });
              })()}
            </>
          ) : (
            <circle cx="50" cy="50" r="40" fill="#e5e7eb" />
          )}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {sortedAllocations.map((allocation, index) => (
          <div key={`${allocation.mint}-${index}`} className="flex items-center text-sm">
            <div className={`w-3 h-3 rounded-sm mr-1 ${getColor(allocation.mint, index)}`}></div>
            <span className="truncate mr-1">{allocation.mint}</span>
            <span className="font-medium">{allocation.weight}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioChart;