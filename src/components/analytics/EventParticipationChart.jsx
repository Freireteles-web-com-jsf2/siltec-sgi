import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getEvents, getRegistrations } from '../../services/storage';

const EventParticipationChart = () => {
  const chartData = React.useMemo(() => {
    const events = getEvents();
    return events.map(event => {
      const registrations = getRegistrations(event.id);
      const approved = registrations.filter(r => r.status === 'approved').length;
      const rate = event.registered > 0 ? Math.round((approved / event.registered) * 100) : 0;
      return {
        name: event.name.length > 15 ? event.name.substring(0, 15) + '...' : event.name,
        rate,
        registered: event.registered || 0,
        approved
      };
    }).filter(e => e.registered > 0);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Taxa de Participação por Evento</h3>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhum evento com inscrições encontrado</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number"
              domain={[0, 100]}
              stroke="#9ca3af"
              fontSize={12}
              unit="%"
            />
            <YAxis 
              dataKey="name" 
              type="category"
              stroke="#9ca3af"
              fontSize={10}
              width={120}
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
            <Bar 
              dataKey="rate" 
              name="Taxa de Participação"
              fill="#8b5cf6" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EventParticipationChart;