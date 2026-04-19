import React from 'react'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
