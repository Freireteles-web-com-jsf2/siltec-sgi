import React from 'react'
import { Users, Wallet, Calendar, Heart } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-text font-manrope">Dashboard</h1>
        <p className="text-text-muted mt-2">Bem-vindo ao Santuário Digital. Aqui está o resumo de hoje.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total de Membros" 
          value="1.248" 
          icon={Users} 
          variation={12} 
        />
        <StatCard 
          title="Dízimos da Semana" 
          value="R$ 15.420" 
          icon={Wallet} 
          variation={8} 
        />
        <StatCard 
          title="Próximos Eventos" 
          value="4" 
          icon={Calendar} 
        />
        <StatCard 
          title="Novas Decisões" 
          value="12" 
          icon={Heart} 
          variation={20} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-santuario-glass border border-white/10 rounded-2xl p-6 h-[400px]">
          <h3 className="text-lg font-semibold mb-4 font-manrope">Fluxo Financeiro</h3>
          <div className="flex items-center justify-center h-full text-text-muted">
            Área do Gráfico (A ser implementado com Recharts)
          </div>
        </div>
        <div className="bg-santuario-glass border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 font-manrope">Próximo Evento</h3>
          <div className="space-y-4">
            <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <span className="text-sm font-bold bg-primary px-2 py-1 rounded">25 ABR</span>
               </div>
            </div>
            <h4 className="font-bold text-lg">Retiro Espiritual 2026</h4>
            <p className="text-sm text-text-muted">Local: Chácara Recanto da Paz</p>
          </div>
        </div>
      </div>
    </div>
  )
}
