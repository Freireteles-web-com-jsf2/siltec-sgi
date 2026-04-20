import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';

describe('DeleteConfirmationModal Component', () => {
  test('renders modal with confirmation message and buttons', () => {
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText(/Tem certeza que deseja excluir este departamento\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar Exclusão/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });

  test('calls onConfirm when Confirm button is clicked', () => {
    const mockOnConfirm = vi.fn();
    const { getByRole } = render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.click(getByRole('button', { name: /Confirmar Exclusão/i }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Cancel button is clicked', () => {
    const mockOnClose = vi.fn();
    const { getByRole } = render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={vi.fn()}
      />
    );

    fireEvent.click(getByRole('button', { name: /Cancelar/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
