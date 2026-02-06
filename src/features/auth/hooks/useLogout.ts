import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function useLogout() {
  const { logout: authLogout } = useAuth()
  const navigate = useNavigate()

  return () => {
    authLogout()
    navigate('/login')
  }
}
