import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';

const categories = ['Retiros', 'Feiras', 'Ações Comunitárias', 'Eventos'];

export default function EventFormEdit({ isOpen, onClose, event, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    capacity: 50,
    category: 'Eventos',
    image: '📅',
    status: 'active',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      const [dDay, dMonth, dYear] = event.date.split('/');
      const dateStr = event.date.includes('/') 
        ? `${dYear}-${dMonth.padStart(2, '0')}-${dDay.padStart(2, '0')}`
        : event.date;
      
      setFormData({
        title: event.title || '',
        date: dateStr || '',
        time: event.time || '',
        description: event.description || '',
        capacity: event.capacity || 50,
        category: event.category || 'Eventos',
        image: event.image || '📅',
        status: event.status || 'active',
      });
    }
  }, [event]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Título é obrigatório';
    if (!formData.date) errs.date = 'Data é obrigatória';
    if (!formData.time) errs.time = 'Horário é obrigatório';
    if (formData.capacity < 1) errs.capacity = 'Capacidade deve ser maior que 0';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSaving(true);
    
    const [y, m, d] = formData.date.split('-');
    const formattedData = {
      ...formData,
      date: `${d}/${m}/${y}`,
    };
    
    await onSave(event.id, formattedData);
    setSaving(false);
    onClose();
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Evento" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Título *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
              errors.title ? 'border-red-500' : 'border-white/20 focus:border-purple-400'
            }`}
            placeholder="Nome do evento"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Data *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white focus:outline-none ${
                errors.date ? 'border-red-500' : 'border-white/20 focus:border-purple-400'
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Horário *</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className={`w-full px-4 py-2 bg-white/10 border rounded-lg text-white focus:outline-none ${
                errors.time ? 'border-red-500' : 'border-white/20 focus:border-purple-400'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Descrição</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            rows={3}
            placeholder="Descrição do evento..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-gray-400 text-sm mb-1">Categoria</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-cosmic">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Ícone</label>
          <div className="flex gap-2 flex-wrap">
            {['📅', '🕯️', '🎪', '🧥', '🎵', '🙏', '✝'].map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, image: icon })}
                className={`w-10 h-10 rounded-lg text-xl ${
                  formData.image === icon 
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
          <label className="block text-gray-400 text-sm mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
          >
            <option value="active" className="bg-cosmic">Ativo</option>
            <option value="cancelled" className="bg-cosmic">Cancelado</option>
          </select>
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