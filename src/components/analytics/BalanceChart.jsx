import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getTransactions } from '../../services/storage';

const BalanceChart = () => {
  const chartData = React.useMemo(() => {
    const transactions = getTransactions();
    const monthlyData = {};
    
    transactions.forEach(tx => {
      const date = new Date(tx.date.split('/').reverse().join('-'));
      const month = date.toLocaleString('pt-BR', { month: 'short' });
      
      if (!monthlyData[month]) {
        monthlyData[month] = { month, receitas: 0, despesas: 0 };
      }
      
      const amount = parseFloat(tx.amount) || 0;
      if (tx.type === 'entrada') {
        monthlyData[month].receitas += amount;
      } else if (tx.type === 'saida') {
        monthlyData[month].despesas += Math.abs(amount);
      }
    });
    
    return Object.values(monthlyData);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Balanço Mensal</h3>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhuma transação encontrada</div>
      ) : (
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
            <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BalanceChart;