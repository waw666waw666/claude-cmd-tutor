import { NavLink } from 'react-router-dom'
import { BookOpen, Terminal, Swords, GraduationCap, Trophy, Home, ChevronLeft, ChevronRight, Lightbulb, Sun, Moon, Play } from 'lucide-react'
import { useState, useRef, useEffect, type MouseEvent } from 'react'
import { useI18n } from '../i18n/context'

interface SidebarProps {
  showHints: boolean
  onToggleHints: () => void
  isDark: boolean
  onToggleTheme: () => void
  autoNext: boolean
  onToggleAutoNext: () => void
  onNavClick?: () => void
}

const logoIcon = (
  <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" style={{ color: 'var(--color-accent)' }} fill="currentColor" aria-hidden="true">
    <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
  </svg>
)

const MIN_WIDTH = 64
const MAX_WIDTH = 280
const COLLAPSE_THRESHOLD = 100

export default function Sidebar({ showHints, onToggleHints, isDark, onToggleTheme, autoNext, onToggleAutoNext, onNavClick }: SidebarProps) {
  const [width, setWidth] = useState(224)
  const [isResizing, setIsResizing] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const { t, lang, setLang } = useI18n()
  const links = [
    { to: '/', icon: Home, label: t.sidebar.dashboard },
    { to: '/commands', icon: BookOpen, label: t.sidebar.commands },
    { to: '/practice', icon: Terminal, label: t.sidebar.practice },
    { to: '/scenarios', icon: Swords, label: t.sidebar.scenarios },
    { to: '/reference', icon: GraduationCap, label: t.sidebar.reference },
    { to: '/progress', icon: Trophy, label: t.sidebar.progress },
  ]
  const resizeStartX = useRef(0)
  const resizeStartWidth = useRef(224)

  const collapsed = width <= COLLAPSE_THRESHOLD

  const handleResizeStart = (e: MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    resizeStartX.current = e.clientX
    resizeStartWidth.current = width
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const delta = e.clientX - resizeStartX.current
      const newWidth = Math.min(Math.max(MIN_WIDTH, resizeStartWidth.current + delta), MAX_WIDTH)
      setWidth(newWidth)
    }
    const handleMouseUp = () => setIsResizing(false)

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove as unknown as EventListener)
      document.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  return (
    <aside
      className={`flex flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-card)] relative ${isResizing ? 'select-none' : 'transition-all duration-200'}`}
      style={{ width, minWidth: width }}
    >
      <div
        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize hover:bg-[var(--color-accent)]/30 z-10"
        onMouseDown={handleResizeStart}
      />

      <div className={`relative ${collapsed ? 'h-10' : 'h-14'} border-b border-[var(--color-border)] overflow-hidden`}>
        <div className={`flex items-center min-w-0 h-full ${collapsed ? 'justify-center px-3' : 'pl-3'}`}>
          {collapsed ? logoIcon : (
            <div className="flex items-center gap-2">
              {logoIcon}
              <span className="font-bold text-sm tracking-wide truncate">{t.common.appName}</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="absolute right-5 top-0 flex items-center h-full gap-0.5">
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              onMouseEnter={() => setHoveredBtn('lang')}
              onMouseLeave={() => setHoveredBtn(null)}
              className="flex items-center justify-center w-8 h-8 rounded text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors duration-150 text-xs font-bold"
              title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button
              onClick={onToggleTheme}
              onMouseEnter={() => setHoveredBtn('theme')}
              onMouseLeave={() => setHoveredBtn(null)}
              className="flex items-center justify-center w-8 h-8 rounded text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-colors duration-150"
              title={isDark ? t.sidebar.lightMode : t.sidebar.darkMode}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        )}
        <button
          onClick={() => setWidth(collapsed ? 224 : MIN_WIDTH)}
          className={`absolute right-0 top-0 flex items-center justify-center w-5 h-full text-[var(--color-text-dimmer)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors duration-150 ${collapsed ? 'shadow-[-1px_0_3px_-1px_rgba(0,0,0,0.06)]' : ''}`}
          title={collapsed ? t.sidebar.expand : t.sidebar.collapse}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 py-3 space-y-1 overflow-hidden">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-150 min-h-[40px] ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-r-2 border-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
              }`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[var(--color-border)] py-2 overflow-hidden">
        <button
          onClick={onToggleAutoNext}
          onMouseEnter={() => setHoveredBtn('autoNext')}
          onMouseLeave={() => setHoveredBtn(null)}
          className={`group relative flex items-center gap-3 w-full px-3 py-2 text-sm transition-all duration-150 min-h-[36px] ${
            collapsed ? 'justify-center' : ''
          } ${
            autoNext
              ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10'
              : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
          }`}
        >
          <Play size={16} className={`shrink-0 ${autoNext ? 'fill-current' : ''}`} />
          {!collapsed && (
            <span className="truncate">{autoNext ? t.sidebar.autoNext : t.sidebar.manualNext}</span>
          )}
          {collapsed && (
            <div className={`absolute left-full ml-2 px-2 py-1 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs text-[var(--color-text)] whitespace-nowrap z-50 ${
              hoveredBtn === 'autoNext' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-150`}>
              {autoNext ? t.sidebar.autoNextOn : t.sidebar.autoNextOff}
            </div>
          )}
        </button>
        <button
          onClick={onToggleHints}
          onMouseEnter={() => setHoveredBtn('hints')}
          onMouseLeave={() => setHoveredBtn(null)}
          className={`group relative flex items-center gap-3 w-full px-3 py-2.5 text-sm transition-all duration-150 min-h-[40px] ${
            collapsed ? 'justify-center' : ''
          } ${
            showHints
              ? 'text-[var(--color-green)] bg-[var(--color-green-glow)]'
              : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
          }`}
        >
          <Lightbulb size={18} className={`shrink-0 ${showHints ? 'fill-current' : ''}`} />
          {!collapsed && (
            <span className="truncate">{showHints ? t.sidebar.hintsOn : t.sidebar.hintsOff}</span>
          )}
          {collapsed && (
            <div className={`absolute left-full ml-2 px-2 py-1 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs text-[var(--color-text)] whitespace-nowrap z-50 ${
              hoveredBtn === 'hints' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-150`}>
              {showHints ? t.sidebar.hintsOnTooltip : t.sidebar.hintsOffTooltip}
              <div className="text-[var(--color-text-dim)] text-[10px] mt-0.5">{t.sidebar.hintsSub}</div>
            </div>
          )}
        </button>
        {!collapsed && hoveredBtn === 'hints' && (
          <div className="px-3 py-1 text-[10px] text-[var(--color-text-dim)] truncate">
            {showHints ? t.sidebar.hintsOnDesc : t.sidebar.hintsOffDesc}
          </div>
        )}
      </div>
    </aside>
  )
}
