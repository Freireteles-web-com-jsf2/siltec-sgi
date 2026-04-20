import { render, screen } from '@testing-library/react';
import DepartmentCard from '@/components/ui/DepartmentCard';

const mockDepartment = {
  id: 1,
  name: 'Ministry of Finance',
  description: 'Handles fiscal matters',
  member_count: 15,
};

describe('DepartmentCard Component', () => {
  test('renders department name, description, and member count', () => {
    render(<DepartmentCard department={mockDepartment} />);

    expect(screen.getByText('Ministry of Finance')).toBeInTheDocument();
    expect(screen.getByText('Handles fiscal matters')).toBeInTheDocument();
    expect(screen.getByText('15 membros')).toBeInTheDocument();
  });

  // Teste para a chamada de funções de editar/excluir quando os botões são clicados (mockados)
  // ...
});
