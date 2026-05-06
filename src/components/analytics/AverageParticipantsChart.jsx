import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getEvents, getRegistrations } from '../../services/storage';

const AverageParticipantsChart = () => {
  const chartData = React.useMemo(() => {
    const events = getEvents();
    const typeData = {};
    
    events.forEach(event => {
      const type = event.type || 'Outros';
      if (!typeData[type]) {
        typeData[type] = { type, total: 0, count: 0 };
      }
      const registrations = getRegistrations(event.id);
      const approved = registrations.filter(r => r.status === 'approved').length;
      typeData[type].total += approved;
      typeData[type].count += 1;
    });
    
    return Object.values(typeData)
      .map(item => ({
        ...item,
        average: item.count > 0 ? Math.round(item.total / item.count) : 0
      }))
      .filter(item => item.count > 0);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Média de Participantes por Tipo</h3>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhum evento encontrado</div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="type" 
              stroke="#9ca3af"
              fontSize={10}
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
            <Bar 
              dataKey="average" 
              name="Média"
              fill="#f59e0b" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AverageParticipantsChart;