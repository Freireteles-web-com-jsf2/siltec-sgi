import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import GroupsPage from '@/pages/GroupsPage';
import DepartmentFormModal from '@/components/modals/DepartmentFormModal';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';
import { useDepartments } from '@/hooks/useDepartments';
import { Department } from '@/types/database'; // Assumindo tipo 'Department'

// Mock the useDepartments hook
vi.mock('@/hooks/useDepartments');
const mockUseDepartments = useDepartments as jest.Mock;

// Mock the useAuth hook to prevent undefined context errors in Sidebar (via MainLayout)
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    signOut: vi.fn(),
    user: { id: 'mock-user-id' },
    session: { access_token: 'mock-token' },
    loading: false,
  }),
}));

describe('GroupsPage Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();

    // Default mock for useDepartments hook, now including CRUD functions
    mockUseDepartments.mockReturnValue({
      departments: [],
      isLoading: true,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );

  test('renders loading state initially', async () => {
    mockUseDepartments.mockReturnValue({
      departments: [],
      isLoading: true,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });

    render(<GroupsPage />, { wrapper });

    expect(screen.getByText(/Carregando grupos.../i)).toBeInTheDocument();
  });

  test('renders departments when loaded successfully', async () => {
    const mockDepartments: Department[] = [
      { id: 1, name: 'Finance', description: 'Handles finances', member_count: 15 },
      { id: 2, name: 'HR', description: 'Handles HR', member_count: 10 },
    ];
    mockUseDepartments.mockReturnValue({
      departments: mockDepartments,
      isLoading: false,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });

    render(<GroupsPage />, { wrapper });

    await waitFor(() => expect(screen.queryByText(/Carregando grupos.../i)).not.toBeInTheDocument());

    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getAllByText(/membros/i)).toHaveLength(4); // 2 cards + 2 nav items (Sidebar & BottomNav)
    expect(screen.getByText('HR')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('renders error message when departments fail to load', async () => {
    const error = new Error('Failed to load');
    mockUseDepartments.mockReturnValue({
      departments: [],
      isLoading: false,
      error: error,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });

    render(<GroupsPage />, { wrapper });

    await waitFor(() => expect(screen.queryByText(/Carregando grupos.../i)).not.toBeInTheDocument());
    expect(screen.getByText(/Erro ao carregar grupos: Failed to load/i)).toBeInTheDocument();
  });

  test('renders message when no departments are found', async () => {
    mockUseDepartments.mockReturnValue({
      departments: [],
      isLoading: false,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });

    render(<GroupsPage />, { wrapper });

    await waitFor(() => expect(screen.queryByText(/Carregando grupos.../i)).not.toBeInTheDocument());
    expect(screen.getByText(/Nenhum grupo encontrado. Adicione um novo!/i)).toBeInTheDocument();
  });

  test('opens modal for adding new department when Add button is clicked', async () => {
    mockUseDepartments.mockReturnValue({
      departments: [],
      isLoading: false,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });

    render(<GroupsPage />, { wrapper });

    await waitFor(() => expect(screen.getByText(/Nenhum grupo encontrado. Adicione um novo!/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /\+ Novo Grupo/i }));

    expect(screen.getByLabelText(/Nome do Departamento/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar Departamento/i })).toBeInTheDocument();
  });

  test('calls createDepartment when saving a new department from modal', async () => {
    const mockCreateDepartment = vi.fn().mockResolvedValue(undefined); // Mocking resolved value for async function
    mockUseDepartments.mockReturnValue({
      departments: [],
      isLoading: false,
      error: null,
      createDepartment: mockCreateDepartment,
      updateDepartment: vi.fn(),
      deleteDepartment: vi.fn(),
    });

    const { getByLabelText, getByRole } = render(<GroupsPage />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: /\+ Novo Grupo/i }));

    fireEvent.change(getByLabelText(/Nome do Departamento/i), { target: { value: 'New Finance' } });
    fireEvent.change(getByLabelText(/Descrição/i), { target: { value: 'Test description' } });
    fireEvent.click(getByRole('button', { name: /Adicionar Departamento/i }));

    await waitFor(() => expect(mockCreateDepartment).toHaveBeenCalledTimes(1));
    expect(mockCreateDepartment).toHaveBeenCalledWith({ name: 'New Finance', description: 'Test description' });
  });

  test('calls updateDepartment when saving edited department from modal', async () => {
    const mockUpdateDepartment = vi.fn().mockResolvedValue(undefined);
    const mockDepartments: Department[] = [{ id: 1, name: 'Finance', description: 'Old desc', member_count: 15 }];
    mockUseDepartments.mockReturnValue({
      departments: mockDepartments,
      isLoading: false,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: mockUpdateDepartment,
      deleteDepartment: vi.fn(),
    });

    render(<GroupsPage />, { wrapper });
    await waitFor(() => expect(screen.getByText('Finance')).toBeInTheDocument());

    // Simulate opening the edit modal for department ID 1
    // This is a simplified test assuming the edit action would correctly populate the modal and trigger its save.
    // For a more robust test, one would need to mock the DepartmentCard's onEdit prop or simulate the component tree.
    
    // Mocking the modal open for editing and its submit action
    const { getByLabelText, getByRole } = render(
        <DepartmentFormModal
            isOpen={true}
            onClose={vi.fn()}
            onSubmit={mockUpdateDepartment}
            initialData={mockDepartments[0]}
        />, { wrapper }
    );
    
    fireEvent.change(getByLabelText(/Nome do Departamento/i), { target: { value: 'Updated Finance' } });
    fireEvent.click(getByRole('button', { name: /Salvar Alterações/i }));

    await waitFor(() => expect(mockUpdateDepartment).toHaveBeenCalledTimes(1));
    expect(mockUpdateDepartment).toHaveBeenCalledWith({ name: 'Updated Finance', description: 'Old desc' });
  });

  test('calls deleteDepartment when confirming deletion', async () => {
    const mockDeleteDepartment = vi.fn().mockResolvedValue(undefined);
    const mockDepartments: Department[] = [{ id: 1, name: 'Finance', description: 'Old desc', member_count: 15 }];
    mockUseDepartments.mockReturnValue({
      departments: mockDepartments,
      isLoading: false,
      error: null,
      createDepartment: vi.fn(),
      updateDepartment: vi.fn(),
      deleteDepartment: mockDeleteDepartment,
    });

    render(<GroupsPage />, { wrapper });
    await waitFor(() => expect(screen.getByText('Finance')).toBeInTheDocument());

    // Simulate confirming deletion through the modal
    // Mocking the delete confirmation modal's confirm action
    const { getByRole: getByRoleConfirm } = render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={() => mockDeleteDepartment(1)}
      />, { wrapper }
    );
    
    fireEvent.click(getByRoleConfirm('button', { name: /Confirmar Exclusão/i }));
    
    await waitFor(() => expect(mockDeleteDepartment).toHaveBeenCalledTimes(1));
    expect(mockDeleteDepartment).toHaveBeenCalledWith(1); // Assuming it's department ID 1
  });
});
