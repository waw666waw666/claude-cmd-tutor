import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lightbulb, Code, Terminal } from 'lucide-react'
import { commands, categoryLabels } from '../data/commands'
import useProgress from '../store/useProgress'
import type { CommandCategory } from '../types'

export default function CommandDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { commandProgress, toggleCommandCompleted } = useProgress()

  const goPractice = () => {
    navigate('/practice', { state: { startCommandId: cmd?.id } })
  }

  const cmd = commands.find(c => c.id === id)
  if (!cmd) {
    return (
      <div className="p-6 text-center">
        <p className="text-[var(--color-text-dim)]">命令未找到</p>
        <button onClick={() => navigate('/commands')} className="text-[var(--color-accent)] text-sm mt-2">
          返回命令列表
        </button>
      </div>
    )
  }

  const completed = commandProgress[cmd.id]?.completed
  const difficultyStars = ['', '⭐', '⭐⭐', '⭐⭐⭐']

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate('/commands')}
        className="flex items-center gap-1.5 text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition-colors"
      >
        <ArrowLeft size={16} />
        返回命令列表
      </button>

      {/* Header */}
      <div className="p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
              {categoryLabels[cmd.category as CommandCategory]}
            </span>
            <span className="text-xs text-[var(--color-orange)]">{difficultyStars[cmd.difficulty]}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleCommandCompleted(cmd.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 ${
                completed
                  ? 'bg-[var(--color-green)]/10 text-[var(--color-green)] border-[var(--color-green)]/20 hover:bg-[var(--color-green)]/20'
                  : 'border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
              }`}
            >
              {completed ? '✓ 已掌握' : '标记'}
            </button>
            <button
              onClick={goPractice}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[#faf9f5] text-xs font-medium hover:bg-[var(--color-accent-dim)] transition-colors"
            >
              <Terminal size={14} />
              去练习
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold font-mono text-[var(--color-accent)]">{cmd.name}</h1>
        <p className="text-[var(--color-text-dim)] mt-2">{cmd.description}</p>
      </div>

      {/* Usage */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={16} className="text-[var(--color-accent)]" />
          <span className="text-sm font-medium">用法</span>
        </div>
        <div className="p-3 rounded-lg bg-[var(--color-bg-base)] font-mono text-sm text-[var(--color-accent)]">
          {cmd.usage}
        </div>
      </div>

      {/* Example */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <Code size={16} className="text-[var(--color-green)]" />
          <span className="text-sm font-medium">示例</span>
        </div>
        <div className="p-3 rounded-lg bg-[var(--color-bg-base)] font-mono text-sm whitespace-pre-wrap text-[var(--color-text-dim)]">
          <span className="text-[var(--color-green)]">$ {cmd.example}</span>
          {'\n'}{cmd.exampleOutput}
        </div>
      </div>

      {/* Tips */}
      {cmd.tips.length > 0 && (
        <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-[var(--color-orange)]" />
            <span className="text-sm font-medium">小贴士</span>
          </div>
          <ul className="space-y-2">
            {cmd.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-dim)]">
                <span className="text-[var(--color-orange)] mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
