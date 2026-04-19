import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wallet, 
  Users2 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Users, label: 'Membros', path: '/membros' },
  { icon: Calendar, label: 'Eventos', path: '/eventos' },
  { icon: Wallet, label: 'Financeiro', path: '/financeiro' },
  { icon: Users2, label: 'Grupos', path: '/grupos' },
]

export const BottomNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-santuario-glass border-t border-white/10 flex items-center justify-around px-2 pb-safe">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.path}
          className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-muted hover:text-primary transition-colors"
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
