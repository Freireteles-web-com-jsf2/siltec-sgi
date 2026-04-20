import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDepartments } from '@/hooks/useDepartments';
import { supabase } from '@/api/supabaseClient';

// Mock Supabase client and its methods
vi.mock('@/api/supabaseClient', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    returns: vi.fn().mockReturnThis(),
    // Mocking return values for different methods
    mockData: vi.fn(),
    mockError: vi.fn(),
  },
}));

// Helper to mock Supabase responses with chainable methods and promise resolution
const mockSupabaseResponse = ({ data = [], error = null }) => {
  const promise = Promise.resolve({ data, error });
  
  // Create a builder-like mock that uses the top-level spies for tracking
  const builder = {
    select: supabase.select.mockReturnThis(),
    insert: supabase.insert.mockReturnThis(),
    update: supabase.update.mockReturnThis(),
    delete: supabase.delete.mockReturnThis(),
    eq: supabase.eq.mockReturnThis(),
    single: supabase.single.mockReturnThis(),
    then: promise.then.bind(promise),
    catch: promise.catch.bind(promise),
    finally: promise.finally.bind(promise),
  };

  // Ensure supabase.from() returns the builder which has all the chainable methods
  supabase.from.mockReturnValue(builder);
};

describe('useDepartments Hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
    // Reset mocks for each test
    mockSupabaseResponse({ data: [], error: null }); // Default to empty success
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('should fetch departments successfully', async () => {
    const mockDepartments = [{ id: 1, name: 'Ministry of Finance', member_count: 15 }];
    mockSupabaseResponse({ data: mockDepartments });

    const { result } = renderHook(() => useDepartments(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.departments).toEqual(mockDepartments);
    expect(result.current.error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.select).toHaveBeenCalledWith('*');
  });

  test('should handle fetch error', async () => {
    const fetchError = new Error('Failed to fetch');
    mockSupabaseResponse({ error: fetchError });

    const { result } = renderHook(() => useDepartments(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.departments).toEqual([]);
    expect(result.current.error).toEqual(fetchError);
  });

  test('should create a department successfully', async () => {
    const newDeptData = { name: 'New Ministry', description: 'Created for testing' };
    const mockCreatedDept = { ...newDeptData, id: 5, member_count: 0 };
    mockSupabaseResponse({ data: [mockCreatedDept] });

    const { result } = renderHook(() => useDepartments(), { wrapper });
    
    await waitFor(() => expect(result.current.isLoading).toBe(false)); // Wait for initial fetch

    await result.current.createDepartment(newDeptData);
    
    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.insert).toHaveBeenCalledWith(newDeptData);
    // InvalidateQueries is called on success, which triggers refetch.
    // We can test this by checking if `supabase.select` was called again after the mutation.
    await waitFor(() => expect(supabase.select).toHaveBeenCalledTimes(2)); // Initial fetch + refetch
  });

  test('should handle error during department creation', async () => {
    const newDeptData = { name: 'New Ministry', description: 'Created for testing' };
    const createError = new Error('Failed to create');
    mockSupabaseResponse({ error: createError }); // Mock error for insert

    const { result } = renderHook(() => useDepartments(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await expect(result.current.createDepartment(newDeptData)).rejects.toThrow('Failed to create');
    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.insert).toHaveBeenCalledWith(newDeptData);
    expect(supabase.select).toHaveBeenCalledTimes(1); // Should not refetch on error
  });

  test('should update a department successfully', async () => {
    const deptIdToUpdate = 1;
    const updatedDeptData = { name: 'Updated Ministry', description: 'Updated description' };
    const mockUpdatedDept = { id: deptIdToUpdate, ...updatedDeptData, member_count: 15 };
    
    mockSupabaseResponse({ data: [mockUpdatedDept] }); // Mock response for update and subsequent refetch

    const { result } = renderHook(() => useDepartments(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.updateDepartment(deptIdToUpdate, updatedDeptData);

    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.update).toHaveBeenCalledWith(updatedDeptData);
    expect(supabase.eq).toHaveBeenCalledWith('id', deptIdToUpdate);
    await waitFor(() => expect(supabase.select).toHaveBeenCalledTimes(2)); // Initial fetch + refetch
  });

  test('should handle error during department update', async () => {
    const deptIdToUpdate = 1;
    const updatedDeptData = { name: 'Updated Ministry' };
    const updateError = new Error('Failed to update');
    mockSupabaseResponse({ error: updateError }); // Mock error for update

    const { result } = renderHook(() => useDepartments(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await expect(result.current.updateDepartment(deptIdToUpdate, updatedDeptData)).rejects.toThrow('Failed to update');
    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.update).toHaveBeenCalledWith(updatedDeptData);
    expect(supabase.eq).toHaveBeenCalledWith('id', deptIdToUpdate);
    expect(supabase.select).toHaveBeenCalledTimes(1); // Should not refetch on error
  });

  test('should delete a department successfully', async () => {
    const deptIdToDelete = 1;
    
    mockSupabaseResponse({ data: [] }); // Mock success response for delete

    const { result } = renderHook(() => useDepartments(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.deleteDepartment(deptIdToDelete);

    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.delete).toHaveBeenCalledWith();
    expect(supabase.eq).toHaveBeenCalledWith('id', deptIdToDelete);
    await waitFor(() => expect(supabase.select).toHaveBeenCalledTimes(2)); // Initial fetch + refetch
  });

  test('should handle error during department deletion', async () => {
    const deptIdToDelete = 1;
    const deleteError = new Error('Failed to delete');
    mockSupabaseResponse({ error: deleteError }); // Mock error for delete

    const { result } = renderHook(() => useDepartments(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await expect(result.current.deleteDepartment(deptIdToDelete)).rejects.toThrow('Failed to delete');
    expect(supabase.from).toHaveBeenCalledWith('departments');
    expect(supabase.delete).toHaveBeenCalledWith();
    expect(supabase.eq).toHaveBeenCalledWith('id', deptIdToDelete);
    expect(supabase.select).toHaveBeenCalledTimes(1); // Should not refetch on error
  });
});
