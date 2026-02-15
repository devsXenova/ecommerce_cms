import { Monitor, Moon, Palette, Sun } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/layout/AdminLayout/ThemeToggle'
import { useTheme } from '@/features/theme'

export function AppearanceSettings() {
  const { resolvedTheme, themePreference } = useTheme()

  return (
    <Card className="border-sage-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sage-900">
          <Palette className="h-5 w-5 text-gold-600" />
          Appearance
        </CardTitle>
        <CardDescription>
          Configure the color mode for your admin experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ThemeToggle compact={false} />

        <div className="grid gap-3 rounded-xl border border-sage-gray-200 bg-sage-gray-50 p-4 text-sm">
          <p className="font-medium text-sage-black">Current mode</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-gray-200 bg-white px-3 py-1 text-xs font-medium text-sage-gray-700">
              <Monitor className="h-3.5 w-3.5" />
              Preference: {themePreference}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-gold/30 bg-sage-gold/10 px-3 py-1 text-xs font-medium text-sage-gold-dark">
              {resolvedTheme === 'dark' ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5" />
              )}
              Active: {resolvedTheme}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
