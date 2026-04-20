import { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Department } from '@/types/database'; // Assumindo que você tenha um tipo 'Department'
import { QueryClient, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define the Supabase table name
const TABLE_NAME = 'departments';

export const useDepartments = () => {
  const queryClient = useQueryClient();

  // Fetch departments
  const { data: departments, isLoading, error } = useQuery<Department[], Error>({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Create department
  const { mutateAsync: createDepartmentMutation } = useMutation({
    mutationFn: async (newDepartment: Omit<Department, 'id'>) => {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(newDepartment);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (err) => {
      console.error("Error creating department:", err);
      // Potentially set an error state here for UI feedback
    },
  });

  // Update department
  const { mutateAsync: updateDepartmentMutation } = useMutation({
    mutationFn: async ({ id, ...updatedData }: { id: number } & Partial<Department>) => {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(updatedData)
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (err) => {
      console.error("Error updating department:", err);
    },
  });

  // Delete department
  const { mutateAsync: deleteDepartmentMutation } = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);
      if (error) throw error;
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (err) => {
      console.error("Error deleting department:", err);
    },
  });

  // Functions to be called by components
  const createDepartment = (newDepartment: Omit<Department, 'id'>) => createDepartmentMutation(newDepartment);
  const updateDepartment = (id: number, updatedData: Partial<Department>) => updateDepartmentMutation({ id, ...updatedData });
  const deleteDepartment = (id: number) => deleteDepartmentMutation(id);

  return {
    departments: departments || [], // Return empty array if data is null
    isLoading,
    error: error as Error | null, // Type assertion for error
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};
