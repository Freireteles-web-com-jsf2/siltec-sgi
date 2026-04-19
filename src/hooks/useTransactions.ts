import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/api/supabaseClient'

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: 'tithe' | 'offering' | 'mission' | 'operations' | 'other'
  amount: number
  description: string | null
  date: string
  created_at: string
}

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      return data as Transaction[]
    }
  })
}

export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ['financial-summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('type, amount, category')

      if (error) throw error

      const summary = data.reduce((acc, curr) => {
        if (curr.type === 'income') acc.totalIncome += Number(curr.amount)
        if (curr.type === 'expense') acc.totalExpense += Number(curr.amount)
        
        if (!acc.byCategory[curr.category]) acc.byCategory[curr.category] = 0
        acc.byCategory[curr.category] += Number(curr.amount)
        
        return acc
      }, { totalIncome: 0, totalExpense: 0, byCategory: {} as Record<string, number> })

      return {
        ...summary,
        balance: summary.totalIncome - summary.totalExpense
      }
    }
  })
}
