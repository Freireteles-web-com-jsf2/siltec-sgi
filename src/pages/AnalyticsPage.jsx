import React, { useMemo } from 'react';
import MetricCard from '../components/analytics/MetricCard';
import MemberGrowthChart from '../components/analytics/MemberGrowthChart';
import DepartmentChart from '../components/analytics/DepartmentChart';
import EngagementMetrics from '../components/analytics/EngagementMetrics';
import FinancialTrendsChart from '../components/analytics/FinancialTrendsChart';
import { getMembers, getDepartments, getEvents, getTransactions } from '../services/storage';

const AnalyticsPage = () => {
  const stats = useMemo(() => {
    const members = getMembers();
    const departments = getDepartments();
    const events = getEvents();
    const transactions = getTransactions();
    
    const activeMembers = members.filter(m => m.status === 'active').length;
    const totalMembers = members.length;
    const totalEvents = events.length;
    
    const receitas = transactions
      .filter(t => t.type === 'entrada')
      .reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);
    const despesas = transactions
      .filter(t => t.type === 'saida')
      .reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);
    
    return {
      totalMembers,
      activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      totalDepartments: departments.length,
      totalEvents,
      activeEvents: events.filter(e => e.status === 'active').length,
      receitas,
      despesas,
      saldo: receitas - despesas,
    };
  }, []);

  const memberGrowthData = useMemo(() => {
    const members = getMembers();
    const monthlyData = {};
    
    members.forEach(member => {
      if (member.registeredAt) {
        const date = new Date(member.registeredAt.split('/').reverse().join('-'));
        const month = date.toLocaleString('pt-BR', { month: 'short' });
        monthlyData[month] = (monthlyData[month] || 0) + 1;
      }
    });
    
    return Object.entries(monthlyData).map(([month, count]) => ({ month, members: count }));
  }, []);

  const departmentData = useMemo(() => {
    const departments = getDepartments();
    return departments.map(d => ({
      name: d.name || 'Sem nome',
      value: d.members?.length || 0
    })).filter(d => d.value > 0);
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
            Aqui está o panorama completo da sua igreja
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total de Membros"
            value={stats.totalMembers}
            subtitle={`${stats.activeMembers} ativos`}
            trend={stats.activeMembers > stats.inactiveMembers ? 'up' : 'down'}
            trendValue={`${Math.round((stats.activeMembers / stats.totalMembers) * 100)}%`}
          />
          
          <MetricCard
            title="Departamentos"
            value={stats.totalDepartments}
            subtitle="Departamentos ativos"
          />
          
          <MetricCard
            title="Eventos"
            value={stats.totalEvents}
            subtitle={`${stats.activeEvents} próximos`}
          />
          
          <MetricCard
            title="Saldo Financeiro"
            value={`R$ ${stats.saldo.toLocaleString('pt-BR')}`}
            subtitle={`R$ ${stats.receitas.toLocaleString('pt-BR')} receitas`}
            trend={stats.saldo > 0 ? 'up' : 'down'}
            trendValue="este mês"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MemberGrowthChart data={memberGrowthData.length > 0 ? memberGrowthData : undefined} />
          
          <DepartmentChart data={departmentData.length > 0 ? departmentData : undefined} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngagementMetrics 
            data={{
              active: stats.activeMembers,
              inactive: stats.inactiveMembers,
              newThisMonth: 5,
              attendance: 78
            }} 
          />
          
          <FinancialTrendsChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;