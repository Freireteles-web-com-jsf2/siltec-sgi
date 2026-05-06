import React from 'react';

const EngagementMetrics = ({ data }) => {
  const metrics = data || {
    active: 78,
    inactive: 24,
    newThisMonth: 12,
    attendance: 85
  };

  const activePercent = Math.round((metrics.active / (metrics.active + metrics.inactive)) * 100);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Métricas de Engajamento</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">Membros Ativos</span>
            <span className="text-white font-medium">{metrics.active}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${activePercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">Membros Inativos</span>
            <span className="text-white font-medium">{metrics.inactive}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${100 - activePercent}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Novos este mês</span>
            <span className="text-emerald-400 font-bold">+{metrics.newThisMonth}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Presença média</span>
          <span className="text-white font-bold">{metrics.attendance}%</span>
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;