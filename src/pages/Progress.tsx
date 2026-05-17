import { Trophy, TrendingUp, Target, Zap, Check, Swords, Flame } from 'lucide-react'
import useProgress from '../store/useProgress'
import { useCommands, useScenarios, useAchievements } from '../hooks/useLocalizedData'
import { useI18n } from '../i18n/context'
import AchievementBadge from '../components/AchievementBadge'
import { countCompletedCommands, calcCompletionPercent } from '../data/constants'

export default function Progress() {
  const { t } = useI18n()
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
  const scPercent = totalScenarios > 0 ? Math.round((completedScenarios / totalScenarios) * 100) : 0
  
  const nextStreakGoal = streakDays < 3 ? 3 : streakDays < 7 ? 7 : streakDays + 7
  const streakPercent = nextStreakGoal <= 7 
    ? Math.round((streakDays / 7) * 100) 
    : Math.min(100, Math.round(((streakDays - 7) / 7) * 100))

  // Calculate unlocked achievements (dynamic check)
  const state = {
    commandProgress,
    scenarioProgress,
    achievements: progress.achievements,
    totalPracticeCount,
    lastActiveDate: progress.lastActiveDate,
    streakDays: progress.streakDays,
  }
  const achieved = achievements.filter(a => a.condition(state as Parameters<typeof a.condition>[0])).map(a => a.id)

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
            <Swords size={14} className="text-[var(--color-purple)]" />
            <span className="text-xs text-[var(--color-text-dim)]">{t.progress.challenges}</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-text)]">{completedScenarios}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">/ {totalScenarios}</div>
          <div className="mt-2 h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
            <div className="h-full rounded-full bg-[var(--color-purple)] transition-all" style={{ width: `${scPercent}%` }} />
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
          <div className="text-xs mt-1" style={{ color: achieved.includes('streak-7') ? 'var(--color-green)' : 'var(--color-text-dim)' }}>
            {achieved.includes('streak-7') ? t.progress.streak7 : achieved.includes('streak-3') ? t.progress.streakRemaining.replace('{days}', '7').replace('{remain}', String(7 - streakDays)) : t.progress.streakRemaining.replace('{days}', '3').replace('{remain}', String(3 - streakDays))}
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${streakPercent}%`, backgroundColor: achieved.includes('streak-7') ? 'var(--color-green)' : 'var(--color-orange)' }} />
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
          {achievements.map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              unlocked={achieved.includes(achievement.id)}
            />
          ))}
        </div>
      </div>

      {/* Command progress detail */}
      <div>
        <h2 className="text-sm font-medium mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-[var(--color-accent)]" />
          {t.progress.detail}
        </h2>
        <div className="space-y-1">
          {commands.map((cmd) => {
            const cp = commandProgress[cmd.id]
            return (
              <div
                key={cmd.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  cp?.completed
                    ? 'bg-[var(--color-green)]/5'
                    : 'bg-[var(--color-bg-card)]'
                }`}
              >
                {cp?.completed ? (
                  <Check size={14} className="text-[var(--color-green)] shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--color-border)] shrink-0" />
                )}
                <span className="font-mono text-xs flex-1">{cmd.name}</span>
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
