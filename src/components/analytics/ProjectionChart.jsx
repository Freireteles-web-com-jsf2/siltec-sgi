import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getTransactions } from '../../services/storage';

const ProjectionChart = () => {
  const { chartData, projection } = React.useMemo(() => {
    const transactions = getTransactions();
    const monthlyData = {};
    
    transactions.forEach(tx => {
      if (tx.type !== 'entrada') return;
      
      const date = new Date(tx.date.split('/').reverse().join('-'));
      const month = date.toLocaleString('pt-BR', { month: 'short' });
      
      if (!monthlyData[month]) {
        monthlyData[month] = { month, receitas: 0 };
      }
      monthlyData[month].receitas += parseFloat(tx.amount) || 0;
    });
    
    const monthlyArray = Object.values(monthlyData);
    
    // Simple linear projection based on last 3 months
    let projectedValue = 0;
    if (monthlyArray.length >= 2) {
      const last = monthlyArray[monthlyArray.length - 1].receitas;
      const previous = monthlyArray[monthlyArray.length - 2].receitas;
      const trend = last - previous;
      projectedValue = Math.max(0, last + trend);
    }
    
    return { 
      chartData: monthlyArray, 
      projection: projectedValue 
    };
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Projeção Financeira</h3>
      <div className="mb-4 text-sm">
        <span className="text-gray-400">Próximo mês (estimado): </span>
        <span className="text-emerald-400 font-bold">
          R$ {projection.toLocaleString('pt-BR')}
        </span>
      </div>
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Nenhuma receita encontrada</div>
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
            <Line 
              type="monotone" 
              dataKey="receitas" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Receitas"
              dot={{ fill: '#10b981', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProjectionChart;