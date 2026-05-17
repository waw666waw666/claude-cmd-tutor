import { useState, useMemo, useEffect, useCallback } from 'react'
import { useOutletContext, useLocation } from 'react-router-dom'
import { Shuffle, ArrowRight, Check, ArrowUpDown } from 'lucide-react'
import { useCommands, useCategoryLabels } from '../hooks/useLocalizedData'
import { useI18n } from '../i18n/context'
import { CATEGORY_ORDER, getDifficultyLabel, getDifficultyColor, buildSearchKeywords } from '../data/constants'
import useProgress from '../store/useProgress'
import type { CommandCategory, PracticeState } from '../types'

type SortMode = 'category' | 'difficulty' | 'name'

type ContextType = {
  practiceState: PracticeState
  setPracticeState: React.Dispatch<React.SetStateAction<PracticeState>>
  showTerminalUser: boolean
  setShowTerminalUser: (show: boolean) => void
}

function SortButton({ mode, current, onClick, label }: { mode: SortMode, current: SortMode, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
        current === mode
          ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
          : 'text-[var(--color-text-dimmer)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
      }`}
    >
      <ArrowUpDown size={14} />
      {label}
    </button>
  )
}

export default function Practice() {
  const { t, lang } = useI18n()
  const commands = useCommands()
  const categoryLabels = useCategoryLabels()
  const { practiceState, setPracticeState, setShowTerminalUser } = useOutletContext<ContextType>()
  const { commandProgress } = useProgress()
  const [search, setSearch] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('category')
  const location = useLocation()

  const startPractice = useCallback((commandId: string) => {
    setShowTerminalUser(true)
    setPracticeState({
      mode: 'practice',
      currentCommandId: commandId,
      currentScenarioId: null,
      currentStepIndex: 0,
    })
  }, [setPracticeState, setShowTerminalUser])

  useEffect(() => {
    const startId = (location.state as { startCommandId?: string })?.startCommandId
    if (startId) {
      startPractice(startId)
      window.history.replaceState({}, '')
    }
  }, [location.state, startPractice])

  const availableCommands = useMemo(() => {
    let list = [...commands]
    if (search) {
      const words = search.toLowerCase().split(/\s+/)
      list = list.filter(c => {
        const keywords = buildSearchKeywords(c)
        return words.every(word => keywords.includes(word))
      })
    }
    return list
  }, [search])

  const sortedCommands = useMemo(() => {
    const list = [...availableCommands]
    switch (sortMode) {
      case 'difficulty':
        return list.sort((a, b) => a.difficulty - b.difficulty)
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      case 'category':
      default:
        return list
    }
  }, [availableCommands, sortMode])

  const grouped = useMemo(() => {
    if (sortMode === 'category') {
      const map: Record<string, typeof commands> = {}
      CATEGORY_ORDER.forEach(cat => {
        const items = sortedCommands.filter(c => c.category === cat)
        if (items.length > 0) map[cat] = items
      })
      return map
    }
    if (sortMode === 'difficulty') {
      const map: Record<string, typeof commands> = {}
      sortedCommands.forEach(cmd => {
        const key = String(cmd.difficulty)
        if (!map[key]) map[key] = []
        map[key].push(cmd)
      })
      return map
    }
    return { all: sortedCommands }
  }, [sortedCommands, sortMode])

  const randomPractice = useCallback(() => {
    const uncompleted = commands.filter(c => !commandProgress[c.id]?.completed)
    const pool = uncompleted.length > 0 ? uncompleted : commands
    if (pool.length > 0) {
      const random = pool[Math.floor(Math.random() * pool.length)]
      startPractice(random.id)
    }
  }, [commandProgress, startPractice])

  const totalCommands = commands.length
  const completedCount = Object.values(commandProgress).filter(c => c.completed).length

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t.practice.title}</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">
            {t.practice.desc}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-dim)]">
            {completedCount}/{totalCommands}
          </span>
          <button
            onClick={randomPractice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[#faf9f5] text-xs font-medium hover:bg-[var(--color-accent-dim)] transition-colors"
          >
            <Shuffle size={12} />
            {t.practice.random}
          </button>
        </div>
      </div>

      {/* Progress summary */}
      <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[var(--color-green)]" />
            <span className="text-[var(--color-text-dim)]">{t.practice.mastered.replace('{count}', String(completedCount))}</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight size={14} className="text-[var(--color-accent)]" />
            <span className="text-[var(--color-text-dim)]">{t.practice.pending.replace('{count}', String(totalCommands - completedCount))}</span>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.practice.search}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-text-dim)] outline-none focus:border-[var(--color-accent)] transition-colors"
        />
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
          <SortButton mode="category" current={sortMode} onClick={() => setSortMode('category')} label={t.practice.sortCategory} />
          <SortButton mode="difficulty" current={sortMode} onClick={() => setSortMode('difficulty')} label={t.practice.sortDifficulty} />
          <SortButton mode="name" current={sortMode} onClick={() => setSortMode('name')} label={t.practice.sortName} />
        </div>
      </div>

      {/* Command grid */}
      {Object.entries(grouped).map(([cat, cmds]) => (
        <div key={cat}>
          {sortMode === 'category' && (
            <h2 className="text-xs font-medium text-[var(--color-text-dimmer)] uppercase tracking-wider mb-2">
              {categoryLabels[cat as CommandCategory]}
            </h2>
          )}
          {sortMode === 'difficulty' && cat !== 'all' && (
            <h2 className={`text-xs font-medium mb-2 ${getDifficultyColor(parseInt(cat))}`}>
              {getDifficultyLabel(parseInt(cat), t.difficulty)}{lang === 'zh' ? ' 难度' : ''}
            </h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {cmds.map((cmd) => {
              const completed = commandProgress[cmd.id]?.completed
              const active = practiceState.mode === 'practice' && practiceState.currentCommandId === cmd.id
              return (
                  <button
                    key={cmd.id}
                    onClick={() => startPractice(cmd.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                        : completed
                        ? 'border-[var(--color-green)]/20 bg-[var(--color-green)]/5 hover:bg-[var(--color-green)]/10'
                        : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-hover)]'
                    }`}
                >
                  {completed ? (
                    <Check size={18} className="text-[var(--color-green)] shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--color-border)] shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs font-medium truncate">
                        {cmd.name}
                      </span>
                      <span className={`text-xs font-medium shrink-0 ${getDifficultyColor(cmd.difficulty)}`}>
                        {getDifficultyLabel(cmd.difficulty, t.difficulty)}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-dim)] truncate mt-0.5">
                      {cmd.summary}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
