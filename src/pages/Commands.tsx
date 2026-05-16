import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, BookOpen } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import useProgress from '../store/useProgress'
import { commands, categoryLabels } from '../data/commands'
import { CATEGORY_ORDER, getDifficultyLabel, getDifficultyColor, buildSearchKeywords, countCompletedCommands } from '../data/constants'
import type { CommandCategory } from '../types'

export default function Commands() {
  const navigate = useNavigate()
  const { commandProgress } = useProgress()
  const [search, setSearch] = useState('')
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
  }, [search])

  const grouped = useMemo(() => {
    const map: Record<string, typeof commands> = {}
    CATEGORY_ORDER.forEach(cat => {
      const items = filtered.filter(c => c.category === cat)
      if (items.length > 0) map[cat] = items
    })
    return map
  }, [filtered])

  const toggleCat = (cat: string) => {
    setExpandedCat(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">命令大全</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">
            共 {commands.length} 个命令，已掌握 {countCompletedCommands(commandProgress)} 个
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索命令名称、描述..."
        className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-text-dimmer)] outline-none focus:border-[var(--color-accent)]/50 transition-colors"
      />

      {/* Command list by category */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([cat, cmds]) => (
          <div key={cat} className="rounded-xl border border-[var(--color-border)] overflow-hidden">
            <button
              onClick={() => toggleCat(cat)}
              className="flex items-center justify-between w-full px-4 py-3 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-[var(--color-accent)]" />
                <span className="text-sm font-medium">{categoryLabels[cat as CommandCategory]}</span>
                <span className="text-xs text-[var(--color-text-dimmer)]">({cmds.length})</span>
              </div>
              <ChevronDown
                size={16}
                className="text-[var(--color-text-dim)] transition-transform duration-300"
                style={{ transform: expandedCat.has(cat) ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence>
              {expandedCat.has(cat) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="divide-y divide-[var(--color-border)]">
                    {cmds.map((cmd) => {
                      const completed = commandProgress[cmd.id]?.completed
                      return (
                        <div
                          key={cmd.id}
                          className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 hover:bg-[var(--color-bg-hover)]"
                          onClick={() => navigate(`/commands/${cmd.id}`)}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-medium">{cmd.name}</span>
                              {completed && (
                                <span className="text-xs text-[var(--color-green)]">✓</span>
                              )}
                            </div>
                            <div className="text-xs text-[var(--color-text-dim)] mt-0.5 truncate">
                              {cmd.summary}
                            </div>
                          </div>
                          <span className={`text-xs justify-self-end ${getDifficultyColor(cmd.difficulty)}`}>
                            {getDifficultyLabel(cmd.difficulty)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-8 text-[var(--color-text-dimmer)] text-sm">
            没有匹配的命令
          </div>
        )}
      </div>
    </div>
  )
}
