import React, { useState } from 'react';

const weeklyServices = [
  { day: 'Domingo', time: '10:00', name: 'Culto Domenical', type: 'service' },
  { day: 'Quarta', time: '19:30', name: 'Culto de Oração', type: 'prayer' },
  { day: 'Sábado', time: '19:30', name: 'Noite de Adoração', type: 'worship' },
];

const events = [
  {
    id: 1,
    title: 'Noite de Ungirão',
    date: '15/05',
    time: '19:00',
    category: 'Retiros',
    description: 'Uma noite especial deavivamento espiritual',
    capacity: 200,
    registered: 145,
    image: '🕯️',
  },
  {
    id: 2,
    title: 'Feira da Comunidade',
    date: '20/05',
    time: '08:00',
    category: 'Feiras',
    description: 'Feira de artesANATIS e comidas típicas',
    capacity: 100,
    registered: 78,
    image: '🎪',
  },
  {
    id: 3,
    title: 'Ação Social - Campanha do Agasalho',
    date: '25/05',
    time: '09:00',
    category: 'Ações Comunitárias',
    description: 'Distribuição de roupas e alimentos',
    capacity: 50,
    registered: 32,
    image: '🧥',
  },
  {
    id: 4,
    title: 'Ensaio do Coral',
    date: '18/05',
    time: '16:00',
    category: 'Eventos',
    description: 'Preparação para o culto debdomenical',
    capacity: 30,
    registered: 22,
    image: '🎵',
  },
];

const categories = ['Todos', 'Retiros', 'Feiras', 'Ações Comunitárias', 'Eventos'];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [registeredEvents, setRegisteredEvents] = useState({});

  const filteredEvents = activeCategory === 'Todos' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  const handleRegister = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    if (registeredEvents[eventId]) {
      setRegisteredEvents(prev => {
        const updated = { ...prev };
        delete updated[eventId];
        return updated;
      });
    } else {
      if (event.registered < event.capacity) {
        setRegisteredEvents(prev => ({
          ...prev,
          [eventId]: true
        }));
        event.registered++;
      }
    }
  };

  // Find mega event (firstRETREAT event)
  const megaEvent = events.find(e => e.category === 'Retiros');

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Eventos ✝</h1>
          <p className="text-gray-400">Calendário de eventos e cultos</p>
        </div>

        {/* Mega Event Card */}
        {megaEvent && (
          <div className="card-glass rounded-2xl p-6 border-2 border-purple-500">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="text-6xl">{megaEvent.image}</div>
              <div className="flex-1">
                <p className="text-purple-400 text-sm font-medium">PRÓXIMO MEGA EVENTO</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{megaEvent.title}</h2>
                <p className="text-gray-300 mt-1">{megaEvent.date} às {megaEvent.time}</p>
                <p className="text-gray-400 mt-2">{megaEvent.description}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{megaEvent.registered}</p>
                <p className="text-gray-400 text-sm">inscritos / {megaEvent.capacity}</p>
                <div className="w-32 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(megaEvent.registered / megaEvent.capacity) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => handleRegister(megaEvent.id)}
                  className={`mt-3 px-6 py-2 rounded-lg font-medium ${
                    registeredEvents[megaEvent.id]
                      ? 'bg-red-500 hover:bg-red-400'
                      : 'bg-purple-600 hover:bg-purple-500'
                  } text-white transition-all`}
                >
                  {registeredEvents[megaEvent.id] ? 'Cancelar' : 'Inscrever-se'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Services */}
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Cultos Semanais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weeklyServices.map((service, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-purple-400 font-bold">{service.day}</p>
                <p className="text-2xl font-bold text-white">{service.time}</p>
                <p className="text-gray-300">{service.name}</p>
                <span className="text-2xl mt-2 block">
                  {service.type === 'service' ? '⛪' : service.type === 'prayer' ? '🙏' : '🎵'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="card-glass rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map(event => (
            <div key={event.id} className="card-glass rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{event.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm">{event.category}</p>
                      <h4 className="text-lg font-bold text-white">{event.title}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      event.registered >= event.capacity
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {event.registered >= event.capacity ? 'Lotado' : `${event.registered}/${event.capacity}`}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{event.date} às {event.time}</p>
                  <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                  
                  <div className="mt-3">
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      />
                    </div>
                    {event.category !== 'Retiros' && (
                      <button
                        onClick={() => handleRegister(event.id)}
                        disabled={!registeredEvents[event.id] && event.registered >= event.capacity}
                        className={`mt-2 px-4 py-1 rounded-lg text-sm font-medium ${
                          registeredEvents[event.id]
                            ? 'bg-red-500 hover:bg-red-400 text-white'
                            : event.registered >= event.capacity
                              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-500 text-white'
                        } transition-all`}
                      >
                        {registeredEvents[event.id] ? 'Cancelar Inscrição' : 'Inscrever-se'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="card-glass rounded-xl p-8 text-center">
            <p className="text-gray-400">Nenhum evento nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}