import React, { useMemo } from 'react';
import MetricCard from '../components/analytics/MetricCard';
import MemberGrowthChart from '../components/analytics/MemberGrowthChart';
import MemberFilters from '../components/analytics/MemberFilters';
import RetentionChart from '../components/analytics/RetentionChart';
import AbsentMembersTable from '../components/analytics/AbsentMembersTable';
import { getMembers, getEvents, getRegistrations } from '../services/storage';

const MemberAnalyticsPage = () => {
  const stats = useMemo(() => {
    const members = getMembers();
    const events = getEvents();
    
    const active = members.filter(m => m.status === 'active').length;
    const inactive = members.filter(m => m.status === 'inactive').length;
    const newMembers = members.filter(m => {
      const regDate = new Date(m.registeredAt.split('/').reverse().join('-'));
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return regDate >= thirtyDaysAgo;
    }).length;
    
    const retention = members.length > 0 ? Math.round((active / members.length) * 100) : 0;
    
    return { total: members.length, active, inactive, newMembers, retention };
  }, []);

  const growthData = useMemo(() => {
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
            Análise detalhada dos membros
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total de Membros"
            value={stats.total}
            subtitle={`${stats.active} ativos`}
          />
          
          <MetricCard
            title="Membros Ativos"
            value={stats.active}
            trend="up"
            trendValue={`${stats.retention}%`}
          />
          
          <MetricCard
            title="Membros Inativos"
            value={stats.inactive}
            trend="down"
          />
          
          <MetricCard
            title="Novos (30 dias)"
            value={stats.newMembers}
            subtitle="Este mês"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MemberGrowthChart data={growthData.length > 0 ? growthData : undefined} />
          <RetentionChart />
        </div>

        <MemberFilters onFilter={(filters) => console.log('Filters:', filters)} />
        
        <div className="mt-6">
          <AbsentMembersTable />
        </div>
      </div>
    </div>
  );
};

export default MemberAnalyticsPage;