import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Department } from '@/types/database'; // Assumindo tipo 'Department'
import { cn } from '@/lib/utils';

interface DepartmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Department, 'id'>) => void;
  initialData: Department | null;
}

const DepartmentFormModal: React.FC<DepartmentFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');

  useEffect(() => {
    // Reset form when modal opens or initialData changes
    setName(initialData?.name || '');
    setDescription(initialData?.description || '');
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('O nome do departamento é obrigatório.');
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-zinc-800/80 border border-zinc-700 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-zinc-100">
            {initialData ? 'Editar Departamento' : 'Novo Departamento'}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
              Nome do Departamento
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ministério de Finanças"
              className="bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-1">
              Descrição
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição do departamento"
              rows={3}
              className="bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? 'Salvar Alterações' : 'Adicionar Departamento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentFormModal;
