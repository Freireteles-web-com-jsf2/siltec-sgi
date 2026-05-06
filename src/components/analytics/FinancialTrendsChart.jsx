import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FinancialTrendsChart = ({ data }) => {
  const chartData = data || [
    { month: 'Jan', receitas: 12500, despesas: 8200 },
    { month: 'Fev', receitas: 15800, despesas: 9100 },
    { month: 'Mar', receitas: 14200, despesas: 7800 },
    { month: 'Abr', receitas: 18500, despesas: 10200 },
    { month: 'Mai', receitas: 16200, despesas: 8700 },
    { month: 'Jun', receitas: 19800, despesas: 11500 },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Tendências Financeiras</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            tickFormatter={(value) => `R$${value/1000}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
          />
          <Legend wrapperStyle={{ color: '#fff', fontSize: '12px' }} />
          <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialTrendsChart;