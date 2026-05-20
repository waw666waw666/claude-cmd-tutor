import { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, BookOpen } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import useProgress from '../store/useProgress'
import { CATEGORY_ORDER, getDifficultyLabel, getDifficultyColor, buildSearchKeywords, countCompletedCommands } from '../data/constants'
import { useI18n } from '../i18n/context'
import { useCommands, useCategoryLabels } from '../hooks/useLocalizedData'
import type { Command, CommandCategory, CommandProgress } from '../types'

interface CommandRowProps {
  command: Command
  completed: boolean
  difficultyLabel: string
  difficultyColor: string
  onOpen: (id: string) => void
}

const CommandRow = memo(function CommandRow({ command, completed, difficultyLabel, difficultyColor, onOpen }: CommandRowProps) {
  return (
    <div
      className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 hover:bg-[var(--color-bg-hover)]"
      onClick={() => onOpen(command.id)}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium">{command.name}</span>
          {completed && (
            <span className="text-xs text-[var(--color-green)]">✓</span>
          )}
        </div>
        <div className="text-xs text-[var(--color-text-dim)] mt-0.5">{command.summary}</div>
      </div>
      <span className={`text-xs justify-self-end ${difficultyColor}`}>
        {difficultyLabel}
      </span>
    </div>
  )
})

interface CommandCategorySectionProps {
  category: string
  commands: Command[]
  expanded: boolean
  mastered: number
  label: string
  description: string
  commandProgress: Record<string, CommandProgress>
  difficultyLabels: Record<string, string>
  onToggle: (category: string) => void
  onOpen: (id: string) => void
}

const CommandCategorySection = memo(function CommandCategorySection({
  category,
  commands,
  expanded,
  mastered,
  label,
  description,
  commandProgress,
  difficultyLabels,
  onToggle,
  onOpen,
}: CommandCategorySectionProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      <button
        onClick={() => onToggle(category)}
        className="flex items-center justify-between w-full px-4 py-3 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-hover)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[var(--color-accent)]" />
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-[var(--color-text-dimmer)]">({commands.length})</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-text-dim)]">{mastered}/{commands.length}</span>
          <ChevronDown
            size={16}
            className="text-[var(--color-text-dim)] transition-transform duration-300"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>
      {expanded && (
        <div className="px-4 py-2 bg-[var(--color-bg-elevated)]/50 border-b border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-dim)] leading-relaxed">{description}</p>
        </div>
      )}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-[var(--color-border)]">
              {commands.map((command) => (
                <CommandRow
                  key={command.id}
                  command={command}
                  completed={Boolean(commandProgress[command.id]?.completed)}
                  difficultyLabel={getDifficultyLabel(command.difficulty, difficultyLabels)}
                  difficultyColor={getDifficultyColor(command.difficulty)}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default function Commands() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const commands = useCommands()
  const categoryLabels = useCategoryLabels()
  const { commandProgress } = useProgress()
  const search = searchParams.get('q') ?? ''
  const [expandedCat, setExpandedCat] = useState<Set<string>>(new Set(CATEGORY_ORDER))

  const filtered = useMemo(() => {
    let list = commands
    if (search) {
      const words = search.toLowerCase().split(/\s+/)
      list = list.filter(c => {
        const keywords = buildSearchKeywords(c)
        return words.every(word => keywords.includes(word))
      })
    }
    return list
  }, [search, commands])

  const grouped = useMemo(() => {
    const map: Record<string, typeof commands> = {}
    CATEGORY_ORDER.forEach(cat => {
      const items = filtered.filter(c => c.category === cat)
      if (items.length > 0) map[cat] = items
    })
    return map
  }, [filtered])

  const toggleCat = useCallback((cat: string) => {
    setExpandedCat((prev: Set<string>) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }, [])

  const openCommand = useCallback((id: string) => navigate(`/commands/${id}`), [navigate])

  const updateSearch = useCallback((value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value.trim()) {
      nextParams.set('q', value.trim())
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams, { replace: true })
  }, [searchParams, setSearchParams])

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t.commands.title}</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">
            {t.commands.desc.replace('{total}', String(commands.length)).replace('{mastered}', String(countCompletedCommands(commandProgress)))}
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder={t.commands.search}
        aria-label={t.commands.search}
        className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-text-dimmer)] outline-none focus:border-[var(--color-accent)]/50 transition-colors"
      />

      {/* Command list by category */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([cat, cmds]) => {
          const mastered = cmds.filter(c => commandProgress[c.id]?.completed).length
          const catDescKey = 'cat' + cat.charAt(0).toUpperCase() + cat.slice(1) as keyof typeof t.commands
          return (
            <CommandCategorySection
              key={cat}
              category={cat}
              commands={cmds}
              expanded={expandedCat.has(cat)}
              mastered={mastered}
              label={categoryLabels[cat as CommandCategory]}
              description={t.commands[catDescKey] as string}
              commandProgress={commandProgress}
              difficultyLabels={t.difficulty}
              onToggle={toggleCat}
              onOpen={openCommand}
            />
          )
        })}
        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-8 text-[var(--color-text-dimmer)] text-sm">
            {t.commands.empty}
          </div>
        )}
      </div>
    </div>
  )
}
