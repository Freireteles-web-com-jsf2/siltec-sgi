const STORAGE_KEY = 'siltec_members';
const EVENTS_KEY = 'siltec_events';
const REGISTRATIONS_KEY = 'siltec_registrations';

export const getMembers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const saveMember = (member) => {
  const members = getMembers();
  const newMember = {
    ...member,
    id: Date.now(),
    registeredAt: new Date().toLocaleDateString('pt-BR'),
    avatar: member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
  };
  members.push(newMember);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return newMember;
};

export const updateMember = (id, data) => {
  const members = getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index !== -1) {
    members[index] = { ...members[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    return members[index];
  }
  return null;
};

export const deleteMember = (id) => {
  const members = getMembers();
  const filtered = members.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

export const bulkDeleteMembers = (ids) => {
  const members = getMembers();
  const filtered = members.filter(m => !ids.includes(m.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

export const getMemberById = (id) => {
  const members = getMembers();
  return members.find(m => m.id === id);
};

export const emailExists = (email, excludeId = null) => {
  const members = getMembers();
  return members.some(m => m.email.toLowerCase() === email.toLowerCase() && m.id !== excludeId);
};

// Events CRUD
export const getEvents = () => {
  const data = localStorage.getItem(EVENTS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const saveEvent = (event) => {
  const events = getEvents();
  const newEvent = {
    ...event,
    id: Date.now(),
    registered: 0,
    registrations: [],
    status: 'active',
  };
  events.push(newEvent);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  return newEvent;
};

export const updateEvent = (id, data) => {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...data };
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    return events[index];
  }
  return null;
};

export const deleteEvent = (id) => {
  const events = getEvents();
  const filtered = events.filter(e => e.id !== id);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
  return filtered;
};

export const getEventById = (id) => {
  const events = getEvents();
  return events.find(e => e.id === id);
};

// Registrations CRUD
const getAllRegistrations = () => {
  const data = localStorage.getItem(REGISTRATIONS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

const saveAllRegistrations = (registrations) => {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
};

export const getRegistrations = (eventId) => {
  const registrations = getAllRegistrations();
  return registrations[eventId] || [];
};

export const addRegistration = (eventId, memberId, memberName) => {
  const registrations = getAllRegistrations();
  if (!registrations[eventId]) {
    registrations[eventId] = [];
  }
  const exists = registrations[eventId].some(r => r.memberId === memberId);
  if (!exists) {
    registrations[eventId].push({
      memberId,
      memberName,
      status: 'pending',
      registeredAt: new Date().toLocaleString('pt-BR'),
    });
    saveAllRegistrations(registrations);
    
    const event = getEventById(eventId);
    if (event) {
      updateEvent(eventId, { registered: (event.registered || 0) + 1 });
    }
  }
  return registrations[eventId];
};

export const removeRegistration = (eventId, memberId) => {
  const registrations = getAllRegistrations();
  if (registrations[eventId]) {
    registrations[eventId] = registrations[eventId].filter(r => r.memberId !== memberId);
    saveAllRegistrations(registrations);
    
    const event = getEventById(eventId);
    if (event) {
      updateEvent(eventId, { registered: Math.max(0, (event.registered || 1) - 1) });
    }
  }
  return registrations[eventId] || [];
};

export const approveRegistration = (eventId, memberId) => {
  const registrations = getAllRegistrations();
  if (registrations[eventId]) {
    const reg = registrations[eventId].find(r => r.memberId === memberId);
    if (reg) {
      reg.status = 'approved';
      saveAllRegistrations(registrations);
    }
  }
  return registrations[eventId] || [];
};

export const rejectRegistration = (eventId, memberId) => {
  const registrations = getAllRegistrations();
  if (registrations[eventId]) {
    registrations[eventId] = registrations[eventId].filter(r => r.memberId !== memberId);
    saveAllRegistrations(registrations);
    
    const event = getEventById(eventId);
    if (event) {
      updateEvent(eventId, { registered: Math.max(0, (event.registered || 1) - 1) });
    }
  }
  return registrations[eventId] || [];
};

export const createRecurringEvent = (event, weeks = 1) => {
  const created = [event];
  let baseEvent = event;
  
  for (let i = 1; i < weeks; i++) {
    const nextEvent = {
      ...baseEvent,
      id: Date.now() + i,
      date: addWeeksToDate(baseEvent.date, i),
    };
    created.push(saveEvent(nextEvent));
  }
  
  return created;
};

const addWeeksToDate = (dateStr, weeks) => {
  const date = new Date(dateStr.split('/').reverse().join('-'));
  date.setDate(date.getDate() + (weeks * 7));
  return date.toLocaleDateString('pt-BR');
};