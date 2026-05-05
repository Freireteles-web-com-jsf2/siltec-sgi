import React, { useState } from 'react';
import Modal from '../ui/Modal';

const categories = ['Dízimo', 'Oferta', 'Doação', 'Aluguel', 'Material', 'Manutenção', 'Outros'];

export default function TransactionFormCreate({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    type: 'entrada',
    amount: '',
    description: '',
    category: 'Dízimo',
    date: new Date().toISOString().split('T')[0],
    memberName: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) return;
    
    setSaving(true);
    const [y, m, d] = formData.date.split('-');
    const txData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: `${d}/${m}/${y}`,
    };
    await onSave(txData);
    setSaving(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Tipo</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'entrada' })}
              className={`flex-1 py-2 rounded-lg ${
                formData.type === 'entrada' ? 'bg-green-600' : 'bg-white/10'
              }`}
            >
              📥 Entrada
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'saida' })}
              className={`flex-1 py-2 rounded-lg ${
                formData.type === 'saida' ? 'bg-red-600' : 'bg-white/10'
              }`}
            >
              📤 Saída
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Valor</label>
          <input
            type="number"
            value={formData.amount}
            onChange={e => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            placeholder="0,00"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Descrição</label>
          <input
            type="text"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            placeholder="Descrição"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Categoria</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-cosmic">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Data</label>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
        </div>

        {formData.type === 'entrada' && (
          <div>
            <label className="block text-gray-400 text-sm mb-1">Membro (opcional)</label>
            <input
              type="text"
              value={formData.memberName}
              onChange={e => setFormData({ ...formData, memberName: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              placeholder="Nome do membro"
            />
          </div>
        )}

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