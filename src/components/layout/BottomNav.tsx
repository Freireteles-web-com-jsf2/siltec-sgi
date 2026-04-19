import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wallet, 
  Users2,
  LogOut 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button' // Import Button for logout

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Users, label: 'Membros', path: '/membros' },
  { icon: Calendar, label: 'Eventos', path: '/eventos' },
  { icon: Wallet, label: 'Financeiro', path: '/financeiro' },
  { icon: Users2, label: 'Grupos', path: '/grupos' },
]

export const BottomNav: React.FC = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-santuario-glass border-t border-white/10 flex items-center justify-around px-2 pb-safe">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className="flex flex-col items-center justify-center w-full h-full gap-1 text-text-muted hover:text-primary transition-colors"
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
      {/* Logout button for mobile */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleSignOut}
        className="text-danger hover:bg-danger/10 hover:text-danger flex flex-col items-center justify-center w-full h-full gap-1"
      >
        <LogOut size={20} />
        <span className="text-[10px] font-medium">Sair</span>
      </Button>
    </nav>
  )
}
