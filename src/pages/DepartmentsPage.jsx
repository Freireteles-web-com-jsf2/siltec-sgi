import React, { useState, useMemo, useEffect } from 'react';
import { getDepartments, saveDepartment, updateDepartment, deleteDepartment, addSubgroup } from '../services/storage';
import { useToast } from '../components/ui/Toast';
import DepartmentFormCreate from '../components/crud/DepartmentFormCreate';
import DepartmentFormEdit from '../components/crud/DepartmentFormEdit';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deletingDeptId, setDeletingDeptId] = useState(null);
  const [newSubgroupName, setNewSubgroupName] = useState('');
  const [subgroupDeptId, setSubgroupDeptId] = useState(null);
  const { success } = useToast();

  useEffect(() => {
    const stored = getDepartments();
    if (stored.length > 0) {
      setDepartments(stored);
    }
  }, []);

  const handleCreate = (formData) => {
    saveDepartment(formData);
    setDepartments(getDepartments());
    success('Departamento criado!');
  };

  const handleEdit = (id, formData) => {
    updateDepartment(id, formData);
    setDepartments(getDepartments());
    success('Departamento atualizado!');
  };

  const handleDelete = (id) => {
    setDeletingDeptId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteDepartment(deletingDeptId);
    setDepartments(getDepartments());
    success('Departamento excluído!');
    setDeletingDeptId(null);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setShowEditModal(true);
  };

  const handleAddSubgroup = (deptId) => {
    if (newSubgroupName.trim()) {
      addSubgroup(deptId, newSubgroupName);
      setDepartments(getDepartments());
      success('Sub-grupo criado!');
      setNewSubgroupName('');
      setSubgroupDeptId(null);
    }
  };

  const totalMembers = departments.reduce((acc, d) => acc + (d.members?.length || 0), 0);
  const totalCapacity = departments.reduce((acc, d) => acc + d.capacity, 0);
  const activeLeaders = departments.filter(d => d.status === 'active').length;

  const engagementRate = totalCapacity > 0 ? Math.round((totalMembers / totalCapacity) * 100) : 0;

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Departamentos ✝</h1>
            <p className="text-gray-400">Ministérios e grupos da congregação</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            ➕ Criar Departamento
          </button>
        </div>

        {/* Stats */}
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
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Lotado</span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Líder</span>
                  <span className="text-white">{dept.leader}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Membros</span>
                  <span className="text-white">{(dept.members?.length || 0)}/{dept.capacity}</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      (dept.members?.length || 0) >= dept.capacity * 0.9
                        ? 'bg-red-500'
                        : (dept.members?.length || 0) >= dept.capacity * 0.7
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${((dept.members?.length || 0) / dept.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Subgroups */}
              {(dept.subgroups?.length > 0 || subgroupDeptId === dept.id) && (
                <div className="mt-3 p-2 bg-white/5 rounded-lg">
                  <p className="text-gray-400 text-xs mb-1">Sub-grupos</p>
                  {dept.subgroups?.map((sg) => (
                    <span key={sg.id} className="inline-block px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded mr-1">
                      {sg.name}
                    </span>
                  ))}
                  {subgroupDeptId === dept.id && (
                    <div className="flex gap-1 mt-1">
                      <input
                        value={newSubgroupName}
                        onChange={e => setNewSubgroupName(e.target.value)}
                        placeholder="Nome"
                        className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs"
                      />
                      <button
                        onClick={() => handleAddSubgroup(dept.id)}
                        className="px-2 py-1 bg-purple-600 text-white text-xs rounded"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-2 flex-wrap">
                <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-1 px-2 rounded text-sm">
                  Ver Membros
                </button>
                <button
                  onClick={() => { setSubgroupDeptId(dept.id); setNewSubgroupName(''); }}
                  className="bg-white/10 hover:bg-white/20 text-white py-1 px-2 rounded text-sm"
                >
                  + Sub
                </button>
                <button
                  onClick={() => openEditModal(dept)}
                  className="bg-white/10 hover:bg-white/20 text-white py-1 px-2 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button if no departments */}
        {departments.length === 0 && (
          <div className="card-glass rounded-xl p-6 border-dashed border-2 border-white/20">
            <div className="text-center">
              <span className="text-4xl">➕</span>
              <p className="text-gray-400 mt-2">Nenhum departamento</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-3 bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-lg"
              >
                Criar Departamento
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <DepartmentFormCreate
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
      />
      <DepartmentFormEdit
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingDept(null); }}
        department={editingDept}
        onSave={handleEdit}
      />
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeletingDeptId(null); }}
        title="Excluir Departamento"
        message="Tem certeza? Membros serão movidos para outros departamentos."
        onConfirm={confirmDelete}
      />
    </div>
  );
}