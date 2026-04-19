import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { MembersPage } from '@/pages/MembersPage'
import { EventsPage } from '@/pages/EventsPage'
import { FinancialPage } from '@/pages/FinancialPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/membros" element={<MembersPage />} />
              <Route path="/eventos" element={<EventsPage />} />
              <Route path="/financeiro" element={<FinancialPage />} />
              {/* Adicionaremos as outras rotas conforme o desenvolvimento progredir */}
              <Route path="*" element={<DashboardPage />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
