import React, { useState } from 'react';
import Modal from '../ui/Modal';

const icons = ['🎸', '🎵', '🤝', '👶', '🎺', '📚', '🎨', '⚽'];

export default function DepartmentFormCreate({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '🎸',
    leader: '',
    capacity: 30,
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Nome é obrigatório';
    if (!formData.leader.trim()) errs.leader = 'Líder é obrigatório';
    if (formData.capacity < 1) errs.capacity = 'Capacidade deve ser maior que 0';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Departamento" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Nome *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-white/20 focus:border-purple-400'
            }`}
            placeholder="Nome do departamento"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
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
                  formData.icon === icon 
                    ? 'bg-purple-600' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Líder *</label>
          <input
            type="text"
            value={formData.leader}
            onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
            className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.leader ? 'border-red-500' : 'border-white/20 focus:border-purple-400'
            }`}
            placeholder="Nome do líder"
          />
          {errors.leader && <p className="text-red-400 text-sm mt-1">{errors.leader}</p>}
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Capacidade</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
            min={1}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Descrição</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            rows={3}
            placeholder="Descrição do departamento..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}