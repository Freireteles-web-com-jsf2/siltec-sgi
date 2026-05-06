import React, { useMemo } from 'react';
import MetricCard from '../components/analytics/MetricCard';
import FinancialTrendsChart from '../components/analytics/FinancialTrendsChart';
import BalanceChart from '../components/analytics/BalanceChart';
import TitheReportTable from '../components/analytics/TitheReportTable';
import ProjectionChart from '../components/analytics/ProjectionChart';
import { getTransactions } from '../services/storage';

const FinancialAnalyticsPage = () => {
  const stats = useMemo(() => {
    const transactions = getTransactions();
    
    const receitas = transactions
      .filter(t => t.type === 'entrada')
      .reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);
    
    const despesas = transactions
      .filter(t => t.type === 'saida')
      .reduce((acc, t) => acc + Math.abs(parseFloat(t.amount) || 0), 0);
    
    const saldo = receitas - despesas;
    
    // Simple projection based on last 3 months trend
    const monthlyData = {};
    transactions.forEach(tx => {
      if (tx.type !== 'entrada') return;
      const date = new Date(tx.date.split('/').reverse().join('-'));
      const month = date.toLocaleString('pt-BR', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + parseFloat(tx.amount);
    });
    
    const months = Object.values(monthlyData);
    let projection = 0;
    if (months.length >= 2) {
      const trend = months[months.length - 1] - months[months.length - 2];
      projection = Math.max(0, months[months.length - 1] + trend);
    }
    
    return { receitas, despesas, saldo, projection };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {getGreeting()}, líder!
          </h1>
          <p className="text-gray-400 mt-1">
            Análise financeira detalhada
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total de Receitas"
            value={`R$ ${stats.receitas.toLocaleString('pt-BR')}`}
            subtitle="Entradas"
            trend="up"
          />
          
          <MetricCard
            title="Total de Despesas"
            value={`R$ ${stats.despesas.toLocaleString('pt-BR')}`}
            subtitle="Saídas"
            trend="down"
          />
          
          <MetricCard
            title="Saldo Atual"
            value={`R$ ${stats.saldo.toLocaleString('pt-BR')}`}
            subtitle="Receitas - Despesas"
            trend={stats.saldo >= 0 ? 'up' : 'down'}
          />
          
          <MetricCard
            title="Projeção Próximo Mês"
            value={`R$ ${stats.projection.toLocaleString('pt-BR')}`}
            subtitle="Baseado na tendência"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BalanceChart />
          <ProjectionChart />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <FinancialTrendsChart />
        </div>

        <div className="mt-6">
          <TitheReportTable />
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalyticsPage;