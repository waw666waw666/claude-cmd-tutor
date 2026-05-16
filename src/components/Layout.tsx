import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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
  
  const [showTerminalUser, setShowTerminalUser] = useState(true)
  const [showHints, setShowHints] = useState(true)
  const [autoNext, setAutoNext] = useState(true)
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

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'dark' : ''}`}>
      <Sidebar
        showHints={showHints}
        onToggleHints={() => setShowHints(!showHints)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        autoNext={autoNext}
        onToggleAutoNext={() => setAutoNext(!autoNext)}
      />
      <div className="flex-1 flex flex-col min-w-0">
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
              className="absolute bottom-2 right-2 z-50 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-accent)]/30 text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors"
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
