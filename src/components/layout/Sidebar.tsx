import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wallet, 
  Users2, 
  ChevronLeft, 
  ChevronRight, 
  LogOut 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Membros', path: '/membros' },
  { icon: Calendar, label: 'Eventos', path: '/eventos' },
  { icon: Wallet, label: 'Financeiro', path: '/financeiro' },
  { icon: Users2, label: 'Grupos', path: '/grupos' },
]

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className={cn(
      "hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 bg-santuario-glass border-r border-white/10",
      collapsed ? "w-20" : "w-[280px]"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xl font-bold font-manrope text-primary truncate">
            Santuário
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-text-muted hover:text-text"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-white/10 group",
              "text-text-muted hover:text-text"
            )}
          >
            <item.icon size={22} className="shrink-0 group-hover:text-primary transition-colors" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start gap-4 text-danger hover:bg-danger/10 hover:text-danger rounded-xl",
            collapsed && "px-3"
          )}
        >
          <LogOut size={22} className="shrink-0" />
          {!collapsed && <span className="font-medium">Sair</span>}
        </Button>
      </div>
    </aside>
  )
}
