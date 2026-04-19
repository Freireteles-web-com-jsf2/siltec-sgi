import React from 'react'
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp, Filter } from 'lucide-react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { useTransactions, useFinancialSummary } from '@/hooks/useTransactions'
import { StatCard } from '@/components/ui/StatCard'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const FLOW_DATA = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Fev', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Abr', income: 2780, expense: 3908 },
  { name: 'Mai', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
]

const CATEGORY_DATA = [
  { name: 'Dízimos', value: 400, color: '#6366f1' },
  { name: 'Ofertas', value: 300, color: '#8b5cf6' },
  { name: 'Missões', value: 300, color: '#f59e0b' },
  { name: 'Outros', value: 200, color: '#22c55e' },
]

export const FinancialPage: React.FC = () => {
  const { data: transactions, isLoading: loadingTransactions } = useTransactions()
  const { data: summary, isLoading: loadingSummary } = useFinancialSummary()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text font-manrope">Financeiro</h1>
          <p className="text-text-muted mt-2">Visão geral do caixa e fluxo financeiro da comunidade.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-santuario-glass border-white/10 gap-2">
            <Filter size={18} /> Filtros
          </Button>
          <Button className="bg-primary hover:bg-primary-hover gap-2">
            Nova Transação
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Saldo em Caixa" 
          value={formatCurrency(summary?.balance || 0)} 
          icon={Wallet} 
        />
        <StatCard 
          title="Entradas (Mês)" 
          value={formatCurrency(summary?.totalIncome || 0)} 
          icon={ArrowUpCircle} 
          variation={15}
        />
        <StatCard 
          title="Saídas (Mês)" 
          value={formatCurrency(summary?.totalExpense || 0)} 
          icon={ArrowDownCircle} 
          variation={-5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-santuario-glass border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-manrope flex items-center gap-2">
              <TrendingUp className="text-primary" /> Fluxo de Caixa (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FLOW_DATA}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="income" stroke="#6366f1" fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-santuario-glass border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-manrope">Alocação por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-santuario-glass border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-bold font-manrope">Transações Recentes</h3>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Ver Todas</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-text-muted font-manrope">Descrição</TableHead>
                  <TableHead className="text-text-muted font-manrope">Tipo</TableHead>
                  <TableHead className="text-text-muted font-manrope">Categoria</TableHead>
                  <TableHead className="text-text-muted font-manrope text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingTransactions ? (
                   Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-white/10 animate-pulse">
                      <TableCell colSpan={4} className="h-12 bg-white/5" />
                    </TableRow>
                  ))
                ) : transactions?.length === 0 ? (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={4} className="h-24 text-center text-text-muted">Nenhuma transação encontrada.</TableCell>
                  </TableRow>
                ) : (
                  transactions?.slice(0, 5).map((tx) => (
                    <TableRow key={tx.id} className="border-white/10 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-text">{tx.description || 'S/ Descr.'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={tx.type === 'income' ? "text-success border-success/30 bg-success/10" : "text-danger border-danger/30 bg-danger/10"}>
                          {tx.type === 'income' ? 'Entrada' : 'Saída'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-text-muted capitalize">{tx.category}</TableCell>
                      <TableCell className={tx.type === 'income' ? "text-success font-bold text-right" : "text-danger font-bold text-right"}>
                        {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-santuario-glass border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold font-manrope">Meta Mensal de Dízimos</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Progresso (65%)</span>
              <span className="text-text font-bold">R$ 13.000 / R$ 20.000</span>
            </div>
            <Progress value={65} className="h-2 bg-zinc-800" />
          </div>
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-xs text-primary leading-relaxed">
              <strong>Dica:</strong> Faltam apenas R$ 7.000 para atingirmos a meta mensal de dízimos. Continue incentivando a comunidade!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
