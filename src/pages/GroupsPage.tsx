import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import DepartmentCard from '@/components/ui/DepartmentCard';
import { useDepartments } from '@/hooks/useDepartments';
import { Department } from '@/types/database'; // Assumindo tipo 'Department'
import { Button } from '@/components/ui/button'; // shadcn/ui button
import DepartmentFormModal from '@/components/modals/DepartmentFormModal'; // Assumindo que este modal será criado
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'; // Assumindo que este modal será criado

const GroupsPage: React.FC = () => {
  const { departments, isLoading, error, createDepartment, updateDepartment, deleteDepartment } = useDepartments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState<number | null>(null);

  const handleAddClick = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (dept: Department) => {
    setEditingDepartment(dept);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingDepartmentId(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
    setDeletingDepartmentId(null); // Ensure this is also cleared if modal is for delete confirmation
  };

  const handleSaveDepartment = async (deptData: Omit<Department, 'id'>) => {
    if (editingDepartment) {
      await updateDepartment(editingDepartment.id, deptData);
    } else {
      await createDepartment(deptData);
    }
    handleModalClose();
  };

  const handleConfirmDelete = async () => {
    if (deletingDepartmentId !== null) {
      await deleteDepartment(deletingDepartmentId);
      setDeletingDepartmentId(null);
      handleModalClose(); // Close delete confirmation modal
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-100">Gestão de Grupos</h1>
          <Button onClick={handleAddClick}>+ Novo Grupo</Button>
        </div>

        {isLoading && <p>Carregando grupos...</p>}
        {error && <p className="text-red-500">Erro ao carregar grupos: {error.message}</p>}

        {!isLoading && !error && departments.length === 0 && (
          <p>Nenhum grupo encontrado. Adicione um novo!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && !error && departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onEdit={() => handleEditClick(dept)}
              onDelete={() => handleDeleteClick(dept.id)}
            />
          ))}
        </div>

        {/* Modais */}
        {(isModalOpen || editingDepartment) && (
          <DepartmentFormModal
            isOpen={isModalOpen || !!editingDepartment}
            onClose={handleModalClose}
            onSubmit={handleSaveDepartment}
            initialData={editingDepartment}
          />
        )}

        {deletingDepartmentId !== null && (
          <DeleteConfirmationModal
            isOpen={deletingDepartmentId !== null}
            onClose={() => setDeletingDepartmentId(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default GroupsPage;

// Nota: Componentes `DepartmentFormModal` e `DeleteConfirmationModal` precisam ser criados.
// O tipo 'Department' e as implementações completas de create/update/delete no hook useDepartments
// são pré-requisitos. A parte do TanStack Query para refetching após mutações precisará ser implementada no hook.
