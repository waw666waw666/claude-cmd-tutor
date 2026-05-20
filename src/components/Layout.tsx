import { lazy, Suspense, useState, useEffect, useRef, startTransition } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'
import Sidebar from './Sidebar'
import useProgress from '../store/useProgress'
import type { PracticeState } from '../types'
import { useI18n } from '../i18n/context'

const Terminal = lazy(() => import('./Terminal'))

export default function Layout() {
  const { t, lang, setLang } = useI18n()
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
  const [recallMode, setRecallMode] = useState(false)
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
    recallMode: false,
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

  useEffect(() => {
    startTransition(() => setMobileMenuOpen(false))
  }, [location.pathname])

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
          recallMode={recallMode}
          onToggleRecall={() => setRecallMode(!recallMode)}
          onNavClick={() => setMobileMenuOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center gap-1 px-2 h-11 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="flex items-center justify-center w-8 h-8 rounded text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
          >
            <Menu size={18} />
          </button>
          <span className="flex-1 text-sm font-bold tracking-wide truncate text-[var(--color-text)]">{t.common.appName}</span>
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            aria-label={lang === 'zh' ? 'Switch language to English' : 'Switch language to Chinese'}
            className="flex items-center justify-center w-8 h-8 rounded text-xs font-bold text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex items-center justify-center w-8 h-8 rounded text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet context={{ practiceState, setPracticeState, showTerminalUser, setShowTerminalUser, recallMode, setRecallMode }} />
        </main>
        <div className="relative">
          {showTerminal && (
            <Suspense fallback={null}>
              <Terminal
                practiceState={practiceState}
                showHints={showHints}
                onToggleHints={() => setShowHints(!showHints)}
                autoNext={autoNext}
                recallMode={recallMode}
                onToggleRecall={() => setRecallMode(!recallMode)}
                onPracticeUpdate={(update) =>
                  setPracticeState((prev) => ({ ...prev, ...update }))
                }
                onClose={() => {
                  setShowTerminalUser(false)
                  if (practiceState.mode !== 'normal') {
                    setPracticeState(prev => ({
                      ...prev,
                      mode: 'normal',
                      currentCommandId: null,
                      currentScenarioId: null,
                      currentStepIndex: 0,
                    }))
                  }
                }}
              />
            </Suspense>
          )}
          {!showTerminal && (
            <button
              onClick={() => setShowTerminalUser(true)}
              aria-label={t.layout.showTerminal}
              className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-accent)]/30 text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {t.layout.showTerminal}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
