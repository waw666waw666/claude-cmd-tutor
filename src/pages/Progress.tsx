import { useNavigate } from 'react-router-dom'
import { Target, Zap, Flame, Check, Trophy } from 'lucide-react'
import useProgress from '../store/useProgress'
import { useCommands, useScenarios, useAchievements } from '../hooks/useLocalizedData'
import { useI18n } from '../i18n/context'
import AchievementBadge from '../components/AchievementBadge'
import { countCompletedCommands, calcCompletionPercent } from '../data/constants'
import type { Achievement } from '../types'

export default function Progress() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const commands = useCommands()
  const scenarios = useScenarios()
  const achievements = useAchievements()
  const progress = useProgress()
  const { commandProgress, scenarioProgress, totalPracticeCount, streakDays } = progress

  const totalCommands = commands.length
  const completedCommands = countCompletedCommands(commandProgress)
  const totalScenarios = scenarios.length
  const completedScenarios = Object.values(scenarioProgress).filter(s => s.completed).length
  const cmdPercent = calcCompletionPercent(commandProgress, totalCommands)

  const nextStreakGoal = streakDays < 3 ? 3 : streakDays < 7 ? 7 : streakDays + 7
  const streakPercent = nextStreakGoal <= 7
    ? Math.round((streakDays / 7) * 100)
    : Math.min(100, Math.round(((streakDays - 7) / 7) * 100))

  const state = {
    commandProgress,
    scenarioProgress,
    achievements: progress.achievements,
    totalPracticeCount,
    lastActiveDate: progress.lastActiveDate,
    streakDays: progress.streakDays,
  }
  const achievedIds = new Set(achievements.filter(a => a.condition(state as Parameters<typeof a.condition>[0])).map(a => a.id))

  function getAchievementProgress(id: string) {
    switch (id) {
      case 'first-step': return { current: Math.min(1, completedCommands), total: 1 }
      case 'learner-5': return { current: Math.min(5, completedCommands), total: 5 }
      case 'learner-10': return { current: Math.min(10, completedCommands), total: 10 }
      case 'master-all': return { current: completedCommands, total: totalCommands }
      case 'first-scenario': return { current: Math.min(1, completedScenarios), total: 1 }
      case 'scenario-master': return { current: completedScenarios, total: totalScenarios }
      case 'practice-50': return { current: Math.min(50, totalPracticeCount), total: 50 }
      case 'streak-3': return { current: Math.min(3, streakDays), total: 3 }
      case 'streak-7': return { current: Math.min(7, streakDays), total: 7 }
      default: return null
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t.progress.title}</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">{t.progress.desc}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-[var(--color-accent)]" />
            <span className="text-xs text-[var(--color-text-dim)]">{t.progress.mastered}</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-text)]">{completedCommands}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">/ {totalCommands}</div>
          <div className="mt-2 h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
            <div className="h-full rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${cmdPercent}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={14} className="text-[var(--color-highlight)]" />
            <span className="text-xs text-[var(--color-text-dim)]">{t.progress.achievements}</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-text)]">{achievedIds.size}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">/ {achievements.length}</div>
          <div className="mt-2 h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
            <div className="h-full rounded-full bg-[var(--color-highlight)] transition-all" style={{ width: `${Math.round((achievedIds.size / achievements.length) * 100)}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-[var(--color-orange)]" />
            <span className="text-xs text-[var(--color-text-dim)]">{t.progress.practices}</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-text)]">{totalPracticeCount}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">{t.progress.total}</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={14} className="text-[var(--color-orange)]" />
            <span className="text-xs text-[var(--color-text-dim)]">{t.progress.streak}</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-text)] flex items-center gap-1">
            {streakDays}
            <span className="text-sm">{t.progress.days}</span>
          </div>
          <div className="text-xs mt-1" style={{ color: achievedIds.has('streak-7') ? 'var(--color-green)' : 'var(--color-text-dim)' }}>
            {achievedIds.has('streak-7') ? t.progress.streak7 : achievedIds.has('streak-3') ? t.progress.streakRemaining.replace('{days}', '7').replace('{remain}', String(7 - streakDays)) : t.progress.streakRemaining.replace('{days}', '3').replace('{remain}', String(3 - streakDays))}
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${streakPercent}%`, backgroundColor: achievedIds.has('streak-7') ? 'var(--color-green)' : 'var(--color-orange)' }} />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Trophy size={16} className="text-[var(--color-orange)]" />
          {t.progress.achievements}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(() => {
            const order = ['first-step', 'first-scenario', 'learner-5', 'streak-3', 'learner-10', 'practice-50', 'scenario-master', 'streak-7', 'master-all']
            return order.map(id => achievements.find(a => a.id === id)).filter((a): a is Achievement => a !== undefined)
          })().map(a => (
            <AchievementBadge
              key={a.id}
              achievement={a}
              unlocked={achievedIds.has(a.id)}
              progress={getAchievementProgress(a.id)}
            />
          ))}
        </div>
      </div>

      {/* Command progress detail */}
      <div>
        <h2 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Target size={14} className="text-[var(--color-accent)]" />
          {t.progress.detail}
        </h2>
        <div className="space-y-1">
          {commands.map((cmd) => {
            const cp = commandProgress[cmd.id]
            return (
              <div
                key={cmd.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all duration-150 hover:bg-[var(--color-bg-hover)] ${
                  cp?.completed
                    ? 'bg-[var(--color-green)]/5'
                    : 'bg-[var(--color-bg-card)]'
                }`}
                onClick={() => navigate(`/commands/${cmd.id}`)}
              >
                  {cp?.completed ? (
                    <Check size={14} className="text-[var(--color-green)] shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--color-border)] shrink-0" />
                  )}
                  <span className="font-mono text-xs flex-1">
                    <span className="relative group">
                      {cmd.name}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                        <div className="font-mono text-xs font-medium text-[var(--color-text)] mb-0.5">{cmd.name}</div>
                        <div className="text-xs text-[var(--color-text-dim)] leading-relaxed">{cmd.summary}</div>
                      </div>
                    </span>
                  </span>
                  <span className="text-xs text-[var(--color-text-dimmer)]">
                    {cp?.completed
                      ? `${t.progress.completed}${cp.lastPracticed ? t.progress.practiceCount.replace('{count}', String(cp.practiceCount)) : ''}`
                      : t.progress.notLearned}
                  </span>
                </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
