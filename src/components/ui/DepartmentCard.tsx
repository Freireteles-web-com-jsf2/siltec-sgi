import React from 'react';
import clsx from 'clsx';
import { Department } from '@/types/database'; // Assumindo tipo 'Department'
import { cn } from '@/lib/utils'; // Utilitário para merge de classes CSS (shadcn/ui)
// Assumir que existem ícones para opções (editar/excluir) e que um menu dropdown será usado

interface DepartmentCardProps {
  department: Department;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onEdit, onDelete }) => {
  // Implementar lógica para menu de opções (dropdown com editar/excluir)
  const handleEditClick = () => {
    if (onEdit) onEdit(department.id);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(department.id);
  };

  return (
    <div className={cn(
      "p-6 rounded-lg shadow-lg border border-zinc-800/50 bg-white/10 backdrop-blur-sm", // Estilo glassmorphism
      "relative"
    )}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-zinc-100">{department.name}</h3>
        {department.description && (
          <p className="text-zinc-300 mt-1 text-sm">{department.description}</p>
        )}
      </div>
      <div className="text-zinc-200">
        <span className="font-semibold">{department.member_count || 0}</span> membros
      </div>

      {/* Menu de opções (placeholder) */}
      <div className="absolute top-3 right-3">
        {/* Aqui entraria um componente de dropdown/menu */}
        <button onClick={handleEditClick} className="text-zinc-400 hover:text-zinc-200 mr-2">
          ✏️ {/* Editar */}
        </button>
        <button onClick={handleDeleteClick} className="text-red-400 hover:text-red-300">
          🗑️ {/* Excluir */}
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;

// Nota: O tipo 'Department' e o utilitário 'cn' devem estar disponíveis.
// A implementação do menu de opções e a lógica de mock dos handlers onEdit/onDelete
// precisam ser completas nos testes.
