import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Productos', href: '/products', icon: Package },
  { name: 'Categorías', href: '/categories', icon: FolderTree },
  { name: 'Órdenes', href: '/orders', icon: ShoppingCart },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Envíos', href: '/shipping', icon: Truck },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
  { name: 'Configuración', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-border bg-card text-card-foreground">
      <div className="border-b border-border p-6">
        <h1 className="text-2xl font-serif font-bold text-gradient-gold">
          Le Pas Sage
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">Panel de Administración</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive =
            location.pathname === item.href || location.pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 transition-all',
                isActive
                  ? 'bg-sage-gold text-sage-black font-medium shadow-gold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-center text-xs text-muted-foreground">© 2024 Le Pas Sage</p>
      </div>
    </div>
  )
}
