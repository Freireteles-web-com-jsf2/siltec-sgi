import React from 'react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-zinc-100 mb-4">Confirmar Exclusão</h2>
        <p className="text-zinc-300 mb-6">
          Tem certeza que deseja excluir este departamento? Esta ação não pode ser desfeita e removerá todos os dados associados.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirmar Exclusão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
