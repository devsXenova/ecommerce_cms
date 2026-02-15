import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme, type ThemePreference } from '@/features/theme'

interface ThemeToggleProps {
  compact?: boolean
  className?: string
}

const themeLabels: Record<ThemePreference, string> = {
  system: 'Sistema',
  dark: 'Oscuro',
  light: 'Claro',
}

const themeOrder: ThemePreference[] = ['system', 'dark', 'light']

export function ThemeToggle({ compact = true, className }: ThemeToggleProps) {
  const { themePreference, resolvedTheme, cycleTheme, setThemePreference } = useTheme()

  const ThemeIcon =
    themePreference === 'dark' ? Moon : themePreference === 'light' ? Sun : Monitor

  if (compact) {
    return (
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`Tema: ${themeLabels[themePreference]} (actual ${themeLabels[resolvedTheme]})`}
        title={`Tema: ${themeLabels[themePreference]}`}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg',
          'text-sage-gray-600 transition-sophisticated hover:bg-sage-gray-100 hover:text-sage-black',
          className
        )}
      >
        <ThemeIcon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage-gray-500">
        Apariencia
      </p>
      <div
        role="radiogroup"
        aria-label="Seleccion de tema"
        className="grid grid-cols-3 gap-2 rounded-xl border border-sage-gray-200 bg-sage-gray-50 p-1.5"
      >
        {themeOrder.map((option) => {
          const isActive = themePreference === option
          const Icon = option === 'dark' ? Moon : option === 'light' ? Sun : Monitor

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setThemePreference(option)}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-sophisticated',
                isActive
                  ? 'bg-sage-gold text-sage-black shadow-gold'
                  : 'text-sage-gray-600 hover:bg-white hover:text-sage-black'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{themeLabels[option]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
