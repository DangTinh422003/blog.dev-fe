'use client'
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="container">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  )
}
