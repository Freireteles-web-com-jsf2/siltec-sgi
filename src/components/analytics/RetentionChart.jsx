import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getMembers } from '../../services/storage';

const RetentionChart = () => {
  const retentionData = React.useMemo(() => {
    const members = getMembers();
    const monthlyData = {};
    
    members.forEach(member => {
      if (member.registeredAt) {
        const date = new Date(member.registeredAt.split('/').reverse().join('-'));
        const month = date.toLocaleString('pt-BR', { month: 'short' });
        if (!monthlyData[month]) {
          monthlyData[month] = { month, total: 0, active: 0 };
        }
        monthlyData[month].total += 1;
        if (member.status === 'active') {
          monthlyData[month].active += 1;
        }
      }
    });
    
    return Object.values(monthlyData).map(item => ({
      ...item,
      retention: item.total > 0 ? Math.round((item.active / item.total) * 100) : 0
    }));
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Taxa de Retenção</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={retentionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            unit="%"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => `${value}%`}
          />
          <Line 
            type="monotone" 
            dataKey="retention" 
            stroke="#06b6d4" 
            strokeWidth={2}
            name="Retenção"
            dot={{ fill: '#06b6d4', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetentionChart;