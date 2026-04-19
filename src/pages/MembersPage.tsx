import React, { useState } from 'react'
import { Search, Users, UserCheck, UserMinus } from 'lucide-react'
import { useMembers, Member } from '@/hooks/useMembers'
import { StatCard } from '@/components/ui/StatCard'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const MembersPage: React.FC = () => {
  const { data: members, isLoading } = useMembers()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredMembers = members?.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: members?.length || 0,
    active: members?.filter(m => m.status === 'active').length || 0,
    inactive: members?.filter(m => m.status === 'inactive').length || 0,
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text font-manrope">Membros</h1>
          <p className="text-text-muted mt-2">Gerencie os membros da comunidade e seus departamentos.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Total" value={stats.total.toString()} icon={Users} />
        <StatCard title="Ativos" value={stats.active.toString()} icon={UserCheck} />
        <StatCard title="Inativos" value={stats.inactive.toString()} icon={UserMinus} />
      </div>

      <div className="bg-santuario-glass border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between bg-white/5">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <Input
              placeholder="Buscar por nome ou email..."
              className="pl-10 bg-zinc-900/50 border-white/10 focus:border-primary transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList className="bg-zinc-900/50 border border-white/10">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Inativos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-text-muted font-manrope">Membro</TableHead>
                <TableHead className="text-text-muted font-manrope">Status</TableHead>
                <TableHead className="text-text-muted font-manrope">Departamento</TableHead>
                <TableHead className="text-text-muted font-manrope">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-white/10">
                    <TableCell colSpan={4} className="h-16 animate-pulse bg-white/5" />
                  </TableRow>
                ))
              ) : filteredMembers?.length === 0 ? (
                <TableRow className="border-white/10">
                  <TableCell colSpan={4} className="h-32 text-center text-text-muted">
                    Nenhum membro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers?.map((member) => (
                  <TableRow key={member.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-white/10">
                          <AvatarImage src={member.avatar_url || ''} />
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-text">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'} className={cn(
                        member.status === 'active' ? "bg-success/20 text-success border-success/30" : "bg-zinc-800 text-text-muted border-white/10"
                      )}>
                        {member.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-muted">
                      {member.department?.name || 'Nenhum'}
                    </TableCell>
                    <TableCell className="text-text-muted">
                      {member.email || '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
