import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThemeContext } from './ThemeContext'
import type { ThemeMode } from './ThemeContext'
import { darkTheme, lightTheme } from '../styles/themes'
const STORAGE_KEY = 'coffee-delivery:theme:v1'
function readPreference(): ThemeMode | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch { return null }
}
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemeMode | null>(readPreference)
  const [systemDark, setSystemDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches)
  const mode = preference ?? (systemDark ? 'dark' : 'light')
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemDark(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    document.documentElement.style.colorScheme = mode
    document.documentElement.dataset.theme = mode
    if (preference) {
      try { localStorage.setItem(STORAGE_KEY, preference) } catch { /* Tema continua funcionando sem armazenamento. */ }
    }
  }, [mode, preference])
  return <ThemeContext.Provider value={{ mode, toggleTheme: () => setPreference(mode === 'light' ? 'dark' : 'light') }}>
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
  </ThemeContext.Provider>
}
