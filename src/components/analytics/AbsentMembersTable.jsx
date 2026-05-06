import React from 'react';
import { getMembers, getEvents, getRegistrations } from '../../services/storage';

const AbsentMembersTable = () => {
  const absentMembers = React.useMemo(() => {
    const members = getMembers();
    const events = getEvents();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    return members
      .filter(member => {
        if (member.status !== 'active') return false;
        
        const memberEvents = events.filter(event => {
          const registrations = getRegistrations(event.id);
          return registrations.some(r => r.memberId === member.id && r.status === 'approved');
        });
        
        const recentEvents = memberEvents.filter(event => {
          const eventDate = new Date(event.date.split('/').reverse().join('-'));
          return eventDate >= threeMonthsAgo;
        });
        
        return recentEvents.length === 0;
      })
      .map(member => {
        const memberEvents = events.filter(event => {
          const registrations = getRegistrations(event.id);
          return registrations.some(r => r.memberId === member.id);
        });
        
        const lastEvent = memberEvents
          .sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB - dateA;
          })[0];
        
        return {
          id: member.id,
          name: member.name,
          department: member.department || 'Sem departamento',
          lastAttendance: lastEvent ? lastEvent.name : 'Nunca participou',
          status: member.status
        };
      });
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Membros Ausentes Frequentes</h3>
      <p className="text-sm text-gray-400 mb-4">
        Membros ativos sem participação em eventos nos últimos 3 meses
      </p>
      
      {absentMembers.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          Nenhum membro ausente encontrado
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="pb-2">Nome</th>
                <th className="pb-2">Departamento</th>
                <th className="pb-2">Última Participação</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {absentMembers.map((member, idx) => (
                <tr key={member.id} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                  <td className="py-3 text-white">{member.name}</td>
                  <td className="py-3 text-gray-300">{member.department}</td>
                  <td className="py-3 text-gray-300">{member.lastAttendance}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-400">
        Total de membros ausentes: <span className="text-white font-medium">{absentMembers.length}</span>
      </div>
    </div>
  );
};

export default AbsentMembersTable;