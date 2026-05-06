import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-300 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      {trendValue && (
        <div className={`mt-3 text-xs flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{trendValue}</span>
          <span className="text-gray-400">{trend}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;