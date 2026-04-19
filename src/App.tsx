import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="bg-santuario-glass p-12 rounded-2xl shadow-2xl">
            <h1 className="text-5xl font-bold text-primary font-manrope mb-4">
              Santuário Digital
            </h1>
            <p className="text-text-muted text-center text-lg">
              Gestão Eclesiástica Moderna
            </p>
          </div>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
