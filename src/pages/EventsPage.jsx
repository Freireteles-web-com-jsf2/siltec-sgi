import React, { useState, useMemo, useEffect } from 'react';
import { getEvents, saveEvent, updateEvent, deleteEvent, getRegistrations, addRegistration, removeRegistration, approveRegistration, rejectRegistration, createRecurringEvent } from '../services/storage';
import { useToast } from '../components/ui/Toast';
import EventFormCreate from '../components/crud/EventFormCreate';
import EventFormEdit from '../components/crud/EventFormEdit';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const weeklyServices = [
  { day: 'Domingo', time: '10:00', name: 'Culto Domenical', type: 'service' },
  { day: 'Quarta', time: '19:30', name: 'Culto de Oração', type: 'prayer' },
  { day: 'Sábado', time: '19:30', name: 'Noite de Adoração', type: 'worship' },
];

const categories = ['Todos', 'Retiros', 'Feiras', 'Ações Comunitárias', 'Eventos'];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [selectedEventRegs, setSelectedEventRegs] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { success, error } = useToast();

  useEffect(() => {
    const stored = getEvents();
    if (stored.length > 0) {
      setEvents(stored);
    }
  }, []);

  const filteredEvents = useMemo(() => {
    return activeCategory === 'Todos' 
      ? events 
      : events.filter(e => e.category === activeCategory);
  }, [events, activeCategory]);

  const handleCreate = (formData, recurring) => {
    if (recurring && formData.recurringWeeks > 1) {
      const [y, m, d] = formData.date.split('-');
      const baseEvent = {
        ...formData,
        date: `${d}/${m}/${y}`,
      };
      createRecurringEvent(baseEvent, formData.recurringWeeks);
    } else {
      const [y, m, d] = formData.date.split('-');
      const eventData = {
        ...formData,
        date: `${d}/${m}/${y}`,
      };
      saveEvent(eventData);
    }
    setEvents(getEvents());
    success('Evento criado com sucesso!');
  };

  const handleEdit = (id, formData) => {
    updateEvent(id, formData);
    setEvents(getEvents());
    success('Evento atualizado com sucesso!');
  };

  const handleDelete = (id) => {
    setDeletingEventId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteEvent(deletingEventId);
    setEvents(getEvents());
    success('Evento excluído com sucesso!');
    setDeletingEventId(null);
  };

  const handleRegister = (eventId, memberName = 'Membro') => {
    if (!registeredEvents[eventId]) {
      addRegistration(eventId, 1, memberName);
      setRegisteredEvents(prev => ({ ...prev, [eventId]: true }));
      setEvents(getEvents());
    } else {
      removeRegistration(eventId, 1);
      setRegisteredEvents(prev => {
        const updated = { ...prev };
        delete updated[eventId];
        return updated;
      });
      setEvents(getEvents());
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setShowEditModal(true);
  };

  const openRegistrationsModal = (event) => {
    setSelectedEvent(event);
    setSelectedEventRegs(getRegistrations(event.id));
    setShowRegistrationsModal(true);
  };

  const handleApprove = (eventId, memberId) => {
    approveRegistration(eventId, memberId);
    setSelectedEventRegs(getRegistrations(eventId));
    setEvents(getEvents());
    success('Inscrição aprovada!');
  };

  const handleReject = (eventId, memberId) => {
    rejectRegistration(eventId, memberId);
    setSelectedEventRegs(getRegistrations(eventId));
    setEvents(getEvents());
  };

  const megaEvent = events.find(e => e.category === 'Retiros' && e.status === 'active');

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Eventos ✝</h1>
            <p className="text-gray-400">Calendário de eventos e cultos</p>
          </div>
          <div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>➕</span> Criar Evento
            </button>
          </div>
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
                <p className="text-3xl font-bold text-white">{megaEvent.registered || 0}</p>
                <p className="text-gray-400 text-sm">inscritos / {megaEvent.capacity}</p>
                <div className="w-32 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${((megaEvent.registered || 0) / megaEvent.capacity) * 100}%` }}
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
            <div key={event.id} className={`card-glass rounded-xl p-4 ${event.status === 'cancelled' ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{event.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm">{event.category}</p>
                      <h4 className="text-lg font-bold text-white">{event.title}</h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (event.registered || 0) >= event.capacity
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {(event.registered || 0) >= event.capacity ? 'Lotado' : `${event.registered || 0}/${event.capacity}`}
                      </span>
                      {event.status === 'cancelled' && (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                          Cancelado
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{event.date} às {event.time}</p>
                  <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                  
                  <div className="mt-3">
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${((event.registered || 0) / event.capacity) * 100}%` }}
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {event.category !== 'Retiros' && event.status === 'active' && (
                        <button
                          onClick={() => handleRegister(event.id)}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            registeredEvents[event.id]
                              ? 'bg-red-500 hover:bg-red-400 text-white'
                              : 'bg-green-600 hover:bg-green-500 text-white'
                          }`}
                        >
                          {registeredEvents[event.id] ? 'Cancelar' : 'Inscrever-se'}
                        </button>
                      )}
                      <button
                        onClick={() => openRegistrationsModal(event)}
                        className="px-3 py-1 rounded-lg text-sm bg-white/10 text-gray-300 hover:bg-white/20"
                      >
                        Inscrições ({event.registered || 0})
                      </button>
                      {event.status === 'active' && (
                        <>
                          <button
                            onClick={() => openEditModal(event)}
                            className="px-3 py-1 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-500"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="px-3 py-1 rounded-lg text-sm bg-red-600 text-white hover:bg-red-500"
                          >
                            Excluir
                          </button>
                        </>
                      )}
                    </div>
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

      {/* Modals */}
      <EventFormCreate
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
      />
      <EventFormEdit
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingEvent(null); }}
        event={editingEvent}
        onSave={handleEdit}
      />
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeletingEventId(null); }}
        title="Excluir Evento"
        message="Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
      />
      
      {/* Registrations Modal */}
      {showRegistrationsModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRegistrationsModal(false)} />
          <div className="relative w-full max-w-lg card-glass rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Inscrições - {selectedEvent.title}</h2>
              <button onClick={() => setShowRegistrationsModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {selectedEventRegs.length === 0 ? (
                <p className="text-gray-400">Nenhuma inscrição</p>
              ) : (
                selectedEventRegs.map((reg, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white">{reg.memberName}</p>
                      <p className="text-gray-400 text-sm">{reg.registeredAt}</p>
                    </div>
                    <div className="flex gap-2">
                      {reg.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(selectedEvent.id, reg.memberId)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleReject(selectedEvent.id, reg.memberId)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                          >
                            Rejeitar
                          </button>
                        </>
                      )}
                      {reg.status === 'approved' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">Aprovado</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}