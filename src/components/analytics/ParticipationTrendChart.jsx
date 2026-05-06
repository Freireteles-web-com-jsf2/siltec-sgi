import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getEvents, getRegistrations } from '../../services/storage';

const ParticipationTrendChart = () => {
  const chartData = React.useMemo(() => {
    const events = getEvents();
    const monthlyData = {};
    
    events.forEach(event => {
      const date = new Date(event.date.split('/').reverse().join('-'));
      const month = date.toLocaleString('pt-BR', { month: 'short' });
      const registrations = getRegistrations(event.id);
      const approved = registrations.filter(r => r.status === 'approved').length;
      
      if (!monthlyData[month]) {
        monthlyData[month] = { month, events: 0, participants: 0 };
      }
      monthlyData[month].events += 1;
      monthlyData[month].participants += approved;
    });
    
    return Object.values(monthlyData);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Tendência de Participação</h3>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhum evento encontrado</div>
      ) : (
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
              dataKey="events" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Eventos"
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="participants" 
              stroke="#06b6d4" 
              strokeWidth={2}
              name="Participantes"
              dot={{ fill: '#06b6d4', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ParticipationTrendChart;