import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MemberGrowthChart = ({ data }) => {
  const chartData = data || [
    { month: 'Jan', members: 45 },
    { month: 'Feb', members: 52 },
    { month: 'Mar', members: 61 },
    { month: 'Apr', members: 78 },
    { month: 'May', members: 95 },
    { month: 'Jun', members: 112 },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Crescimento de Membros</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="members" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MemberGrowthChart;