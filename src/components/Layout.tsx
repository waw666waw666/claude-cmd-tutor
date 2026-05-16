import { useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import Terminal from './Terminal'
import useProgress from '../store/useProgress'
import type { PracticeState } from '../types'

export default function Layout() {
  const updateStreak = useProgress((state) => state.updateStreak)
  const location = useLocation()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateStreak()
  }, [updateStreak])

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [location.pathname])
  
  const [showTerminalUser, setShowTerminalUser] = useState(false)
  const [showHints, setShowHints] = useState(true)
  const [autoNext, setAutoNext] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [practiceState, setPracticeState] = useState<PracticeState>({
    mode: 'normal',
    currentCommandId: null,
    currentScenarioId: null,
    currentStepIndex: 0,
  })

  const showTerminal = practiceState.mode !== 'normal' || showTerminalUser

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'dark' : ''}`}>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar: hidden on mobile unless open, normal on lg+ */}
      <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-40 h-full flex transition-transform duration-200 lg:transition-none`}>
        <Sidebar
          showHints={showHints}
          onToggleHints={() => setShowHints(!showHints)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          autoNext={autoNext}
          onToggleAutoNext={() => setAutoNext(!autoNext)}
          onNavClick={closeMobileMenu}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center gap-2 px-3 h-11 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center w-8 h-8 rounded text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
          >
            <Menu size={18} />
          </button>
          <span className="text-sm font-bold tracking-wide truncate text-[var(--color-text)]">CC训练营</span>
        </div>

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet context={{ practiceState, setPracticeState, showTerminalUser, setShowTerminalUser }} />
        </main>
        <div className="relative">
          {showTerminal && (
            <Terminal
              practiceState={practiceState}
              showHints={showHints}
              onToggleHints={() => setShowHints(!showHints)}
              autoNext={autoNext}
              onPracticeUpdate={(update) =>
                setPracticeState((prev) => ({ ...prev, ...update }))
              }
              onClose={() => {
                setShowTerminalUser(false)
                if (practiceState.mode !== 'normal') {
                  setPracticeState({
                    mode: 'normal',
                    currentCommandId: null,
                    currentScenarioId: null,
                    currentStepIndex: 0,
                  })
                }
              }}
            />
          )}
          {!showTerminal && (
            <button
              onClick={() => setShowTerminalUser(true)}
              className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-accent)]/30 text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              显示终端
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
