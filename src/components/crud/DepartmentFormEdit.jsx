import React, { useState } from 'react';
import Modal from '../ui/Modal';

const icons = ['🎸', '🎵', '🤝', '👶', '🎺', '📚', '🎨', '⚽'];

export default function DepartmentFormEdit({ isOpen, onClose, department, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '🎸',
    leader: '',
    capacity: 30,
    description: '',
    status: 'active',
  });
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        icon: department.icon || '🎸',
        leader: department.leader || '',
        capacity: department.capacity || 30,
        description: department.description || '',
        status: department.status || 'active',
      });
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setSaving(true);
    await onSave(department.id, formData);
    setSaving(false);
    onClose();
  };

  if (!department) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Departamento" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Ícone</label>
          <div className="flex gap-2 flex-wrap">
            {icons.map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`w-12 h-12 rounded-lg text-2xl ${
                  formData.icon === icon ? 'bg-purple-600' : 'bg-white/10'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Líder</label>
          <input
            type="text"
            value={formData.leader}
            onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Capacidade</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            min={1}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            <option value="active" className="bg-cosmic">Ativo</option>
            <option value="limited" className="bg-cosmic">Lotado</option>
            <option value="inactive" className="bg-cosmic">Inativo</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}