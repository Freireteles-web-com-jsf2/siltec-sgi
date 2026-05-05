const STORAGE_KEY = 'siltec_members';

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