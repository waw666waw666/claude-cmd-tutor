import type { Achievement } from '../types'

interface Props {
  achievement: Achievement
  unlocked: boolean
  progress?: { current: number; total: number } | null
}

export default function AchievementBadge({ achievement, unlocked, progress }: Props) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
        unlocked
          ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5'
          : 'border-[var(--color-border)] bg-[var(--color-bg-card)] opacity-50'
      }`}
    >
      <span className="text-2xl">{achievement.icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${unlocked ? 'text-[var(--color-text)]' : 'text-[var(--color-text-dim)]'}`}>
          {achievement.title}
        </div>
        <div className="text-xs text-[var(--color-text-dimmer)] truncate">
          {achievement.description}
        </div>
        {!unlocked && progress && (
          <div className="mt-1.5 h-1 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-text-dimmer)]/40 transition-all"
              style={{ width: `${Math.round((progress.current / progress.total) * 100)}%` }}
            />
          </div>
        )}
      </div>
      {unlocked && (
        <span className="text-xs text-[var(--color-accent)] font-medium">✓</span>
      )}
    </div>
  )
}
