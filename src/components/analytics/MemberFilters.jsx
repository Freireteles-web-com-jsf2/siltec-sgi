import React, { useState } from 'react';

const MemberFilters = ({ onFilter }) => {
  const [status, setStatus] = useState('all');
  const [department, setDepartment] = useState('all');
  const [period, setPeriod] = useState('monthly');

  const departments = [
    { id: 'all', name: 'Todos' },
    { id: 'musica', name: 'Música' },
    { id: 'ensino', name: 'Ensino' },
    { id: 'comunhao', name: 'Comunhão' },
    { id: 'multimidia', name: 'Multimídia' },
  ];

  const handleFilter = () => {
    onFilter?.({ status, department, period });
  };

  React.useEffect(() => {
    handleFilter();
  }, [status, department, period]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="new">Novos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Departamento</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Período</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="monthly">Mensal</option>
            <option value="quarterly">Trimestral</option>
            <option value="yearly">Anual</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MemberFilters;