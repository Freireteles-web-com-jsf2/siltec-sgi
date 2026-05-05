import React, { useState, useMemo, useEffect } from 'react';
import { getMembers, saveMember, updateMember, deleteMember, bulkDeleteMembers, emailExists } from '../services/storage';
import MemberFormCreate from '../components/crud/MemberFormCreate';
import MemberFormEdit from '../components/crud/MemberFormEdit';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useToast } from '../components/ui/Toast';

const departments = ['Todos', 'Ministério Jovem', 'Coral', 'Diaconia', 'Kudus', 'Band'];

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [activeDept, setActiveDept] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const { success, error } = useToast();
  const itemsPerPage = 10;

  useEffect(() => {
    const stored = getMembers();
    if (stored.length > 0) {
      setMembers(stored);
    }
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesDept = activeDept === 'Todos' || member.department === activeDept;
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [members, activeDept, searchTerm]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const currentMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'ativo').length;
  const inactiveMembers = totalMembers - activeMembers;

  const handleCreate = async (formData) => {
    if (emailExists(formData.email)) {
      error('Este e-mail já está cadastrado');
      return;
    }
    saveMember(formData);
    setMembers(getMembers());
    success('Membro cadastrado com sucesso!');
  };

  const handleEdit = async (id, formData) => {
    if (emailExists(formData.email, id)) {
      error('Este e-mail já está em uso');
      return;
    }
    updateMember(id, formData);
    setMembers(getMembers());
    success('Membro atualizado com sucesso!');
  };

  const handleDelete = (id) => {
    setDeletingMemberId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteMember(deletingMemberId);
    setMembers(getMembers());
    success('Membro excluído com sucesso!');
    setDeletingMemberId(null);
  };

  const handleBulkSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === currentMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentMembers.map(m => m.id));
    }
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const confirmBulkDelete = () => {
    bulkDeleteMembers(selectedIds);
    setMembers(getMembers());
    success(`${selectedIds.length} membros excluídos!`);
    setSelectedIds([]);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setShowEditModal(true);
  };

  const exportCSV = () => {
    const headers = ['Nome', 'E-mail', 'Telefone', 'Departamento', 'Status', 'Data Registro'];
    const rows = filteredMembers.map(m => [m.name, m.email, m.phone, m.department, m.status, m.registeredAt]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `membros_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportPDF = () => {
    alert('Exportação PDF em desenvolvimento - use CSV por enquanto');
  };

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Membros ✝</h1>
            <p className="text-gray-400">Gerenciamento de membros da congregação</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>➕</span> Cadastrar
            </button>
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>📄</span> CSV
            </button>
            <button
              onClick={exportPDF}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>📑</span> PDF
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">👥</span>
              <div>
                <p className="text-gray-400 text-sm">Total de Membros</p>
                <p className="text-2xl font-bold text-white">{totalMembers}</p>
              </div>
            </div>
          </div>
          <div className="card-glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-gray-400 text-sm">Ativos</p>
                <p className="text-2xl font-bold text-green-400">{activeMembers}</p>
              </div>
            </div>
          </div>
          <div className="card-glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⏸️</span>
              <div>
                <p className="text-gray-400 text-sm">Inativos</p>
                <p className="text-2xl font-bold text-red-400">{inactiveMembers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters - Department Tabs */}
        <div className="card-glass rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => { setActiveDept(dept); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeDept === dept
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Bulk Actions */}
        <div className="card-glass rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
              >
                Excluir ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Members Table */}
        <div className="card-glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === currentMembers.length && currentMembers.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Membro</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Departamento</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Contato</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Cadastro</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentMembers.map(member => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(member.id)}
                        onChange={() => handleBulkSelect(member.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-gray-400 text-sm">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-300">{member.department}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        member.status === 'ativo' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {member.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-300 text-sm">{member.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-400 text-sm">{member.registeredAt}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-400">Nenhum membro encontrado</p>
            </div>
          )}

          {/* Pagination */}
          <div className="px-4 py-3 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-400 text-sm">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredMembers.length)} de {filteredMembers.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-gray-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MemberFormCreate
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
      />
      <MemberFormEdit
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingMember(null); }}
        member={editingMember}
        onSave={handleEdit}
      />
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeletingMemberId(null); }}
        title="Excluir Membro"
        message="Tem certeza que deseja excluir este membro? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
      />
      <ConfirmDialog
        isOpen={showBulkDeleteModal}
        onClose={() => { setShowBulkDeleteModal(false); }}
        title="Excluir Membros"
        message={`Tem certeza que deseja excluir ${selectedIds.length} membros? Esta ação não pode ser desfeita.`}
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
}