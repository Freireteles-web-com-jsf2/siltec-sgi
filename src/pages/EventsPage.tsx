import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { EventCard } from '@/components/ui/EventCard'
import { ptBR } from 'date-fns/locale'

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Culto de Celebração',
    description: 'Um momento especial de louvor e adoração com toda a comunidade.',
    date: '20 ABR, 19:30',
    location: 'Santuário Principal',
    category: 'worship' as const,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Retiro de Jovens 2026',
    description: 'Fim de semana de imersão espiritual e comunhão para jovens de 15 a 25 anos.',
    date: '25-27 ABR',
    location: 'Chácara Recanto da Paz',
    category: 'retreat' as const,
  },
  {
    id: '3',
    title: 'Feira das Nações',
    description: 'Evento beneficente com gastronomia e cultura de diversos países.',
    date: '02 MAI, 10:00',
    location: 'Estacionamento Norte',
    category: 'fair' as const,
  },
  {
    id: '4',
    title: 'Ação Social: Sopão',
    description: 'Distribuição de alimentos e agasalhos para pessoas em situação de vulnerabilidade.',
    date: '05 MAI, 20:00',
    location: 'Centro Comunitário',
    category: 'social' as const,
  }
]

export const EventsPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-text font-manrope">Eventos</h1>
        <p className="text-text-muted mt-2">Fique por dentro da agenda e participe das nossas atividades.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-semibold font-manrope flex items-center gap-2">
            Próximos Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_EVENTS.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto space-y-6">
          <h2 className="text-xl font-semibold font-manrope">Calendário</h2>
          <div className="bg-santuario-glass border border-white/10 rounded-2xl p-4 inline-block">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              locale={ptBR}
            />
          </div>
          
          <div className="bg-santuario-glass border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold font-manrope text-sm uppercase tracking-wider text-primary">Destaque do Mês</h3>
            <div className="space-y-2">
              <h4 className="font-bold text-lg">Conferência Renovação</h4>
              <p className="text-xs text-text-muted">Participe de 3 dias de palestras e workshops focados em crescimento pessoal e espiritual.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
