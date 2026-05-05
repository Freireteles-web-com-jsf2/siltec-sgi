import React from 'react';

export default function DashboardPage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name":"Visitante"}');
  
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const metrics = {
    totalMembers: 156,
    weeklyTithes: 5240,
    growth: 5.2,
    newMembers: 8,
  };

  const todayAgenda = [
    { time: '09:00', event: 'Escola Bíblica', type: 'church' },
    { time: '10:00', event: 'Culto Domenical', type: 'service' },
    { time: '14:00', event: 'Reunião Líderes', type: 'meeting' },
    { time: '19:30', event: 'Culto de Adoração', type: 'service' },
  ];

  const nextEvent = {
    name: 'Culto Domenical',
    time: '10:00',
    day: 'Domingo',
    date: '08/05',
  };

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header com saudação */}
        <div className="card-glass rounded-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {greeting()}, {currentUser.name}! ✝
              </h1>
              <p className="text-gray-400 mt-1">Bem-vindo ao Santuário Digital</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{metrics.totalMembers}</p>
                <p className="text-gray-400 text-sm">membros</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <p className="text-sm text-gray-400">hoje</p>
                <p className="text-purple-400 font-medium">{nextEvent.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card do próximo evento em destaque */}
        <div className="card-glass rounded-2xl p-4 md:p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🔔</div>
            <div>
              <p className="text-sm text-gray-400">Próximo evento</p>
              <h2 className="text-xl md:text-2xl font-bold text-white">{nextEvent.name}</h2>
              <p className="text-purple-400">{nextEvent.day} às {nextEvent.time} • {nextEvent.date}</p>
            </div>
          </div>
        </div>

        {/* Grid de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Métricas financeiras */}
          <div className="card-glass rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-400 text-sm">Dízimos questa semana</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              R$ {metrics.weeklyTithes.toLocaleString('pt-BR')}
            </p>
            <div className="mt-3 h-16 flex items-end gap-1">
              {[65, 80, 45, 90, 70, 55, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500/50 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">últimos 7 dias</p>
          </div>

          {/* Crescimento */}
          <div className="card-glass rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-400 text-sm">Crescimento</h3>
              <span className="text-2xl">📈</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-blue-400">
              +{metrics.growth}%
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {metrics.newMembers} novos membros este mês
            </p>
            <div className="mt-3 h-16 flex items-end gap-1">
              {[40, 55, 45, 70, 60, 75, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-500/50 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Visitantes */}
          <div className="card-glass rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-400 text-sm">Visitantes</h3>
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-yellow-400">
              12
            </p>
            <p className="text-gray-400 text-sm mt-1">este mês</p>
            <div className="mt-3 flex gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center text-xs">A</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center text-xs">B</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center text-xs">C</div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-500">+9</div>
            </div>
          </div>
        </div>

        {/* Agenda diária */}
        <div className="card-glass rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Agenda de Hoje</h3>
            <span className="text-gray-400">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="space-y-3">
            {todayAgenda.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
              >
                <div className="w-16 text-purple-400 font-mono text-sm">{item.time}</div>
                <div className="flex-1">
                  <p className="text-white">{item.event}</p>
                </div>
                <span className="text-lg">
                  {item.type === 'service' ? '⛪' : item.type === 'meeting' ? '👥' : '📖'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}