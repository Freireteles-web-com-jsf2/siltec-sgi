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

// Departments CRUD
const DEPARTMENTS_KEY = 'siltec_departments';

export const getDepartments = () => {
  const data = localStorage.getItem(DEPARTMENTS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const saveDepartment = (department) => {
  const departments = getDepartments();
  const newDept = {
    ...department,
    id: Date.now(),
    members: department.members || [],
    subgroups: department.subgroups || [],
    status: 'active',
  };
  departments.push(newDept);
  localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(departments));
  return newDept;
};

export const updateDepartment = (id, data) => {
  const departments = getDepartments();
  const index = departments.findIndex(d => d.id === id);
  if (index !== -1) {
    departments[index] = { ...departments[index], ...data };
    localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(departments));
    return departments[index];
  }
  return null;
};

export const deleteDepartment = (id) => {
  const departments = getDepartments();
  const filtered = departments.filter(d => d.id !== id);
  localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(filtered));
  return filtered;
};

export const getDepartmentById = (id) => {
  const departments = getDepartments();
  return departments.find(d => d.id === id);
};

export const addMemberToDepartment = (deptId, memberId, memberName) => {
  const dept = getDepartmentById(deptId);
  if (dept && !dept.members.some(m => m.id === memberId)) {
    const updatedMembers = [...dept.members, { id: memberId, name: memberName }];
    updateDepartment(deptId, { members: updatedMembers });
    return updatedMembers;
  }
  return dept?.members || [];
};

export const removeMemberFromDepartment = (deptId, memberId) => {
  const dept = getDepartmentById(deptId);
  if (dept) {
    const updatedMembers = dept.members.filter(m => m.id !== memberId);
    updateDepartment(deptId, { members: updatedMembers });
    return updatedMembers;
  }
  return [];
};

export const addSubgroup = (deptId, subgroupName) => {
  const dept = getDepartmentById(deptId);
  if (dept) {
    const newSubgroups = [...(dept.subgroups || []), { id: Date.now(), name: subgroupName }];
    updateDepartment(deptId, { subgroups: newSubgroups });
    return newSubgroups;
  }
  return [];
};

// Financial CRUD - Transactions
const TRANSACTIONS_KEY = 'siltec_transactions';

export const getTransactions = () => {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const saveTransaction = (transaction) => {
  const transactions = getTransactions();
  const newTx = {
    ...transaction,
    id: Date.now(),
    date: transaction.date || new Date().toLocaleDateString('pt-BR'),
  };
  transactions.push(newTx);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  return newTx;
};

export const updateTransaction = (id, data) => {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...data };
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    return transactions[index];
  }
  return null;
};

export const deleteTransaction = (id) => {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
  return filtered;
};

export const getTransactionsByType = (type) => {
  return getTransactions().filter(t => t.type === type);
};

export const getMonthlyTotals = () => {
  const transactions = getTransactions();
  const entrada = transactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
  const saida = transactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + Math.abs(t.amount), 0);
  return { entrada, saida, saldo: entrada - saida };
};