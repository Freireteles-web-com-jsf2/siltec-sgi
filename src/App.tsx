import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { MembersPage } from '@/pages/MembersPage'
import { EventsPage } from '@/pages/EventsPage'
import { FinancialPage } from '@/pages/FinancialPage'
import { GroupsPage } from '@/pages/GroupsPage' // Importe GroupsPage
import { AuthPage } from '@/pages/AuthPage'
import React from 'react'

const queryClient = new QueryClient()

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-background text-primary">Carregando...</div>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/membros" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MembersPage />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/eventos" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <EventsPage />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/financeiro" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <FinancialPage />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            {/* Nova rota para Grupos */}
            <Route 
              path="/grupos" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <GroupsPage />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            {/* Adicionaremos as outras rotas conforme o desenvolvimento progredir */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
