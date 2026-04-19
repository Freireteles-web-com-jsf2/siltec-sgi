import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/layout/MainLayout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainLayout>
          <div className="bg-santuario-glass p-8 md:p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto mt-20">
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-manrope mb-4 text-center">
              Santuário Digital
            </h1>
            <p className="text-text-muted text-center text-base md:text-lg">
              Bem-vindo ao sistema de gestão eclesiástica. Navegue pelo menu para começar.
            </p>
          </div>
        </MainLayout>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
