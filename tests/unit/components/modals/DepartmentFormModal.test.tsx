import { render, screen, fireEvent } from '@testing-library/react';
import DepartmentFormModal from '@/components/modals/DepartmentFormModal';

const mockDepartment = {
  id: 1,
  name: 'Ministry of Finance',
  description: 'Handles fiscal matters',
  member_count: 15,
};

describe('DepartmentFormModal Component', () => {
  test('renders modal with department name and description inputs', () => {
    render(
      <DepartmentFormModal
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={null} // For create mode
      />
    );

    expect(screen.getByLabelText(/Nome do Departamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar Departamento/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });

  test('fills inputs with initial data when editing', () => {
    render(
      <DepartmentFormModal
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={mockDepartment} // For edit mode
      />
    );

    expect(screen.getByLabelText(/Nome do Departamento/i)).toHaveValue('Ministry of Finance');
    expect(screen.getByLabelText(/Descrição/i)).toHaveValue('Handles fiscal matters');
  });

  test('calls onSubmit with correct data when Save button is clicked', () => {
    const mockOnSubmit = vi.fn();
    const { getByLabelText, getByRole } = render(
      <DepartmentFormModal
        isOpen={true}
        onClose={vi.fn()}
        onSubmit={mockOnSubmit}
        initialData={null}
      />
    );

    fireEvent.change(getByLabelText(/Nome do Departamento/i), { target: { value: 'New Ministry' } });
    fireEvent.change(getByLabelText(/Descrição/i), { target: { value: 'New description' } });
    fireEvent.click(getByRole('button', { name: /Adicionar Departamento/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'New Ministry', description: 'New description' });
  });

  test('calls onClose when Cancel button is clicked', () => {
    const mockOnClose = vi.fn();
    const { getByRole } = render(
      <DepartmentFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={vi.fn()}
        initialData={null}
      />
    );

    fireEvent.click(getByRole('button', { name: /Cancelar/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
