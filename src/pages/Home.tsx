import { useNavigate } from 'react-router-dom'
import { BookOpen, Terminal, Swords, GraduationCap, ArrowRight, Zap, TrendingUp, Flame } from 'lucide-react'
import useProgress from '../store/useProgress'
import { commands } from '../data/commands'
import { scenarios } from '../data/scenarios'
import { countCompletedCommands, calcCompletionPercent } from '../data/constants'

const quickLinks = [
  { to: '/commands', icon: BookOpen, label: '命令大全', desc: '浏览所有命令', color: 'border-l-[var(--color-accent)]' },
  { to: '/practice', icon: Terminal, label: '交互练习', desc: '动手练习每个命令', color: 'border-l-[var(--color-green)]' },
  { to: '/scenarios', icon: Swords, label: '情景挑战', desc: '模拟真实场景', color: 'border-l-[var(--color-orange)]' },
  { to: '/reference', icon: GraduationCap, label: '速查手册', desc: '一键速查', color: 'border-l-[var(--color-purple)]' },
]

export default function Home() {
  const navigate = useNavigate()
  const { commandProgress, totalPracticeCount, streakDays, lastActiveDate } = useProgress()

  const completedCount = countCompletedCommands(commandProgress)
  const totalCount = commands.length
  const progressPercent = calcCompletionPercent(commandProgress, totalCount)
  
  const today = new Date().toISOString().split('T')[0]
  const isActiveToday = lastActiveDate === today

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-medium mb-4">
          <Zap size={12} />
          Claude Code 命令训练营
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          掌握 Claude Code 命令
        </h1>
        <p className="text-[var(--color-text-dim)] max-w-lg mx-auto">
          从零上手 Claude Code 命令
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="text-2xl font-bold text-[var(--color-accent)]">{completedCount}/{totalCount}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">已掌握命令</div>
        </div>
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="text-2xl font-bold text-[var(--color-green)]">{totalPracticeCount}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">练习次数</div>
        </div>
        <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="text-2xl font-bold text-[var(--color-orange)]">{scenarios.length}</div>
          <div className="text-xs text-[var(--color-text-dimmer)] mt-1">情景挑战</div>
        </div>
        <div className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${isActiveToday ? 'bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20' : 'bg-[var(--color-bg-card)] border-[var(--color-border)]'}`}>
          <div className="flex items-center gap-1.5">
            <Flame size={16} className={isActiveToday ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dimmer)]'} />
            <div className={`text-2xl font-bold ${isActiveToday ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dim)]'}`}>{streakDays}</div>
          </div>
          <div className="text-xs mt-1 text-[var(--color-text-dim)]">
            {streakDays >= 3 ? '🔥 连续学习中' : '每日打卡'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-[var(--color-accent)]" />
            <span className="text-sm font-medium">学习进度</span>
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
          {commands.slice(0, 8).map((cmd) => (
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
          {commands.length > 8 && (
            <span className="px-2 py-0.5 rounded text-xs text-[var(--color-text-dimmer)]">
              +{commands.length - 8} more
            </span>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
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
