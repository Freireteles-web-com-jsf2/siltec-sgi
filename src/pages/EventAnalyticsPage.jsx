import React, { useMemo } from 'react';
import MetricCard from '../components/analytics/MetricCard';
import EventParticipationChart from '../components/analytics/EventParticipationChart';
import PopularEventsChart from '../components/analytics/PopularEventsChart';
import ParticipationTrendChart from '../components/analytics/ParticipationTrendChart';
import AverageParticipantsChart from '../components/analytics/AverageParticipantsChart';
import { getEvents, getRegistrations } from '../services/storage';

const EventAnalyticsPage = () => {
  const stats = useMemo(() => {
    const events = getEvents();
    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'active').length;
    
    let totalParticipants = 0;
    let totalApproved = 0;
    events.forEach(event => {
      const registrations = getRegistrations(event.id);
      const approved = registrations.filter(r => r.status === 'approved').length;
      totalParticipants += approved;
      totalApproved += approved;
    });
    
    const average = totalEvents > 0 ? Math.round(totalParticipants / totalEvents) : 0;
    
    // Find most popular event
    const popularEvent = events
      .map(event => ({
        ...event,
        participants: getRegistrations(event.id).filter(r => r.status === 'approved').length
      }))
      .sort((a, b) => b.participants - a.participants)[0];
    
    return {
      totalEvents,
      activeEvents,
      average,
      popularEventName: popularEvent ? popularEvent.name : 'Nenhum'
    };
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
            Análise detalhada dos eventos
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total de Eventos"
            value={stats.totalEvents}
            subtitle={`${stats.activeEvents} ativos`}
          />
          
          <MetricCard
            title="Média Participantes"
            value={stats.average}
            subtitle="Por evento"
          />
          
          <MetricCard
            title="Evento Mais Popular"
            value={stats.popularEventName.length > 15 ? stats.popularEventName.substring(0, 15) + '...' : stats.popularEventName}
            subtitle="Mais participantes"
          />
          
          <MetricCard
            title="Eventos Ativos"
            value={stats.activeEvents}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EventParticipationChart />
          <PopularEventsChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParticipationTrendChart />
          <AverageParticipantsChart />
        </div>
      </div>
    </div>
  );
};

export default EventAnalyticsPage;