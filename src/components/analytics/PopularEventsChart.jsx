import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getEvents, getRegistrations } from '../../services/storage';

const PopularEventsChart = () => {
  const chartData = React.useMemo(() => {
    const events = getEvents();
    return events
      .map(event => {
        const registrations = getRegistrations(event.id);
        const approved = registrations.filter(r => r.status === 'approved').length;
        return {
          name: event.name.length > 12 ? event.name.substring(0, 12) + '...' : event.name,
          participants: approved,
          registered: event.registered || 0
        };
      })
      .sort((a, b) => b.participants - a.participants)
      .slice(0, 10);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Eventos Mais Populares</h3>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhum evento encontrado</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number"
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              stroke="#9ca3af"
              fontSize={10}
              width={100}
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
              dataKey="participants" 
              name="Participantes"
              fill="#06b6d4" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PopularEventsChart;