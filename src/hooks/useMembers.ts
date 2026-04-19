import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/api/supabaseClient'

export interface Member {
  id: string
  name: string
  email: string | null
  phone: string | null
  avatar_url: string | null
  status: 'active' | 'inactive'
  department: {
    name: string
  } | null
  registered_at: string
}

export const useMembers = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          department:departments(name)
        `)
        .order('name')

      if (error) throw error
      return data as unknown as Member[]
    }
  })
}
