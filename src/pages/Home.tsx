import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Terminal, Swords, GraduationCap, ArrowRight, Zap, TrendingUp, Flame, ChevronRight, Trophy } from 'lucide-react'
import useProgress from '../store/useProgress'
import { countCompletedCommands, calcCompletionPercent, getDifficultyLabel, getDifficultyColor } from '../data/constants'
import { useI18n } from '../i18n/context'
import { useCommands, useAchievements } from '../hooks/useLocalizedData'
import { getLocalDateKey } from '../utils/date'
import { countUnlockedAchievements } from '../utils/achievements'

type PathLevel = 'beginner' | 'intermediate' | 'advanced'

const learningPaths: Record<PathLevel, string[]> = {
  beginner: ['help', 'clear', 'exit', 'model', 'compact'],
  intermediate: ['doctor', 'cost', 'review', 'search', 'claude-continue'],
  advanced: ['mcp', 'agents', 'background', 'plan', 'claude-pipe'],
}

export default function Home() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const commands = useCommands()
  const achievements = useAchievements()
  const { commandProgress, scenarioProgress, achievements: earnedAchievements, totalPracticeCount, streakDays, lastActiveDate } = useProgress()
  const [pathLevel, setPathLevel] = useState<PathLevel>('beginner')

  const quickLinks = [
    { to: '/commands', icon: BookOpen, label: t.home.commands, desc: t.home.commandsDesc, color: 'border-l-[var(--color-accent)]' },
    { to: '/practice', icon: Terminal, label: t.home.practice, desc: t.home.practiceDesc, color: 'border-l-[var(--color-green)]' },
    { to: '/scenarios', icon: Swords, label: t.home.scenarios, desc: t.home.scenariosDesc, color: 'border-l-[var(--color-orange)]' },
    { to: '/reference', icon: GraduationCap, label: t.home.reference, desc: t.home.referenceDesc, color: 'border-l-[var(--color-highlight)]' },
  ]

  const completedCount = countCompletedCommands(commandProgress)
  const totalCount = commands.length
  const progressPercent = calcCompletionPercent(commandProgress, totalCount)

  const today = getLocalDateKey()
  const isActiveToday = lastActiveDate === today

  const achievedCount = countUnlockedAchievements(achievements, {
    commandProgress,
    scenarioProgress,
    achievements: earnedAchievements,
    totalPracticeCount,
    lastActiveDate,
    streakDays,
  })

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-medium mb-4">
          <Zap size={12} />
          {t.home.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] mb-3 tracking-tight">
          {t.home.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-dim)] max-w-2xl mx-auto leading-relaxed">
          {t.home.desc}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="text-2xl font-bold text-[var(--color-accent)]">{completedCount}/{totalCount}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">{t.home.mastered}</div>
        </div>
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="text-2xl font-bold text-[var(--color-green)]">{totalPracticeCount}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">{t.home.practices}</div>
        </div>
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="flex items-center gap-1.5">
            <Trophy size={16} className="text-[var(--color-highlight)]" />
            <div className="text-2xl font-bold text-[var(--color-highlight)]">{achievedCount}</div>
          </div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">/ {achievements.length} {t.home.achievements}</div>
        </div>
        <div className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${isActiveToday ? 'bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20' : 'bg-[var(--color-bg-card)] border-[var(--color-border)]'}`}>
          <div className="flex items-center gap-1.5">
            <Flame size={16} className={isActiveToday ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dimmer)]'} />
            <div className={`text-2xl font-bold ${isActiveToday ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dim)]'}`}>{streakDays}</div>
          </div>
          <div className="text-xs mt-1 text-[var(--color-text-dim)]">
            {streakDays >= 3 ? t.home.streak : t.home.daily}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-[var(--color-accent)]" />
            <span className="text-sm font-medium">{t.home.progress}</span>
          </div>
          <span className="text-xs text-[var(--color-text-dim)]">{progressPercent}%</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-dim)] to-[var(--color-accent)] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {commands.slice(0, 6).map((cmd) => (
            <span
              key={cmd.id}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer hover:opacity-80 ${
                commandProgress[cmd.id]?.completed
                  ? 'bg-[var(--color-green)]/10 text-[var(--color-green)] border border-[var(--color-green)]/20'
                  : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-dimmer)] border border-[var(--color-border)]'
              }`}
              onClick={() => navigate(`/commands/${cmd.id}`)}
            >
              {commandProgress[cmd.id]?.completed ? '✓ ' : ''}{cmd.name}
            </span>
          ))}
          {commands.length > 6 && (
            <span className="px-2 py-0.5 rounded text-xs text-[var(--color-text-dimmer)]">
              +{commands.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={16} className="text-[var(--color-accent)]" />
          <span className="text-sm font-medium">{t.learningPaths.title}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {(['beginner', 'intermediate', 'advanced'] as PathLevel[]).map((level) => {
            const colors = {
              beginner: { active: 'bg-[var(--color-green)]/10 text-[var(--color-green)] border-[var(--color-green)]/30', inactive: '' },
              intermediate: { active: 'bg-[var(--color-orange)]/10 text-[var(--color-orange)] border-[var(--color-orange)]/30', inactive: '' },
              advanced: { active: 'bg-[var(--color-red)]/10 text-[var(--color-red)] border-[var(--color-red)]/30', inactive: '' },
            }
            return (
              <button
                key={level}
                onClick={() => setPathLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  pathLevel === level ? colors[level].active : 'border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
                }`}
              >
                {t.learningPaths[level]}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {learningPaths[pathLevel].map((id, i) => {
            const cmd = commands.find(c => c.id === id)
            if (!cmd) return null
            return (
              <button
                key={cmd.id}
                onClick={() => navigate(`/commands/${cmd.id}`)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-hover)] transition-colors text-left group"
              >
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium">{cmd.name}</span>
                    <span className={`text-xs ${getDifficultyColor(cmd.difficulty)}`}>
                      {getDifficultyLabel(cmd.difficulty, t.difficulty)}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--color-text-dim)] truncate">{cmd.summary}</div>
                </div>
                <ChevronRight size={14} className="text-[var(--color-text-dimmer)] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {quickLinks.map(({ to, icon: Icon, label, desc, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] border-l-2 ${color} hover:bg-[var(--color-bg-elevated)] hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left group`}
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-[var(--color-text-dim)]" />
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-[var(--color-text-dimmer)]">{desc}</div>
              </div>
            </div>
            <ArrowRight size={16} className="text-[var(--color-text-dimmer)] group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>


    </div>
  )
}
