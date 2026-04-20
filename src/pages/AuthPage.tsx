import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/api/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const AuthPage: React.FC = () => {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isSignIn, setIsSignIn] = useState(true)

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      navigate('/')
    }
  }, [session, navigate])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isSignIn) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        setMessage('Login bem-sucedido! Redirecionando...')
        // Short delay to show the success message before redirecting
        setTimeout(() => navigate('/'), 1000)
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        setMessage('Cadastro realizado! Verifique seu email para confirmar.')
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-santuario-glass border-white/10 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-manrope text-primary">{isSignIn ? 'Entrar' : 'Cadastre-se'}</CardTitle>
          <CardDescription className="text-text-muted">
            {isSignIn ? 'Acesse sua conta do Santuário Digital' : 'Crie sua conta no Santuário Digital'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-900/50 border-white/10 focus:border-primary transition-colors"
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-zinc-900/50 border-white/10 focus:border-primary transition-colors"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover" disabled={loading}>
              {loading ? (isSignIn ? 'Entrando...' : 'Cadastrando...') : (isSignIn ? 'Entrar' : 'Cadastrar')}
            </Button>
          </form>

          {error && (
            <Alert variant="danger" className="mt-4 bg-danger/10 text-danger border-danger/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert variant="success" className="mt-4 bg-success/10 text-success border-success/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center text-sm text-text-muted">
            {isSignIn ? (
              <>Não tem uma conta?{' '}
                <Button variant="link" onClick={() => setIsSignIn(false)} className="p-0 h-auto text-primary hover:text-primary-hover">
                  Cadastre-se
                </Button>
              </>
            ) : (
              <>Já tem uma conta?{' '}
                <Button variant="link" onClick={() => setIsSignIn(true)} className="p-0 h-auto text-primary hover:text-primary-hover">
                  Entrar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
