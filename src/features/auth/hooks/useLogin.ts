import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoginCredentials } from '../types/auth.types'

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await login(credentials)
    },
    onSuccess: () => {
      navigate('/dashboard')
    },
  })
}
