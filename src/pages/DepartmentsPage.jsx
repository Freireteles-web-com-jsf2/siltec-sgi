import React from 'react';

const departments = [
  {
    id: 1,
    name: 'Ministério Jovem',
    icon: '🎸',
    leader: 'Carlos Silva',
    members: 45,
    capacity: 60,
    description: ' Jovens de 15 a 30 anos',
    status: 'active',
  },
  {
    id: 2,
    name: 'Coral',
    icon: '🎵',
    leader: 'Maria Santos',
    members: 20,
    capacity: 30,
    description: 'Ensaio sábado 16:00',
    status: 'active',
  },
  {
    id: 3,
    name: 'Diaconia',
    icon: '🤝',
    leader: 'Pedro Costa',
    members: 12,
    capacity: 20,
    description: 'Assistência social',
    status: 'active',
  },
  {
    id: 4,
    name: 'Kudus',
    icon: '👶',
    leader: 'Ana Oliveira',
    members: 30,
    capacity: 40,
    description: 'Crianças até 12 anos',
    status: 'active',
  },
  {
    id: 5,
    name: 'Band',
    icon: '🎺',
    leader: 'Paulo Lima',
    members: 8,
    capacity: 15,
    description: 'Música instrumental',
    status: 'limited',
  },
];

export default function DepartmentsPage() {
  const totalMembers = departments.reduce((acc, d) => acc + d.members, 0);
  const totalCapacity = departments.reduce((acc, d) => acc + d.capacity, 0);
  const activeLeaders = departments.filter(d => d.status === 'active').length;

  const engagementRate = Math.round((totalMembers / totalCapacity) * 100);

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Departamentos ✝</h1>
          <p className="text-gray-400">Ministérios e grupos da congregação</p>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">👥</span>
              <div>
                <p className="text-gray-400 text-sm">Total Membros</p>
                <p className="text-2xl font-bold text-white">{totalMembers}</p>
              </div>
            </div>
          </div>
          <div className="card-glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <p className="text-gray-400 text-sm">Engajamento</p>
                <p className="text-2xl font-bold text-purple-400">{engagementRate}%</p>
              </div>
            </div>
          </div>
          <div className="card-glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">👑</span>
              <div>
                <p className="text-gray-400 text-sm">Líderes Ativos</p>
                <p className="text-2xl font-bold text-green-400">{activeLeaders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map(dept => (
            <div 
              key={dept.id} 
              className={`card-glass rounded-xl p-4 ${
                dept.status === 'limited' ? 'border border-yellow-500/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{dept.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{dept.name}</h3>
                    <p className="text-gray-400 text-sm">{dept.description}</p>
                  </div>
                </div>
                {dept.status === 'limited' && (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                    Lotado
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Líder</span>
                  <span className="text-white">{dept.leader}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Membros</span>
                  <span className="text-white">{dept.members}/{dept.capacity}</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      dept.members >= dept.capacity * 0.9
                        ? 'bg-red-500'
                        : dept.members >= dept.capacity * 0.7
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${(dept.members / dept.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-1 px-3 rounded text-sm">
                  Ver Membros
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded text-sm">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Department */}
        <div className="card-glass rounded-xl p-6 border-dashed border-2 border-white/20">
          <div className="text-center">
            <span className="text-4xl">➕</span>
            <p className="text-gray-400 mt-2">Adicionar novo departamento</p>
            <button className="mt-3 bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-lg">
              Criar Departamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}