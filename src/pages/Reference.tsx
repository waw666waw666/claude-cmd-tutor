import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { commands, categoryLabels } from '../data/commands'
import { CATEGORY_ORDER, getDifficultyLabel, getDifficultyColor } from '../data/constants'

export default function Reference() {
  const navigate = useNavigate()

  const grouped = CATEGORY_ORDER.map(cat => ({
    category: cat,
    label: categoryLabels[cat],
    commands: commands.filter(c => c.category === cat),
  }))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">速查手册</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">所有命令一目了然，快速查阅</p>
        </div>
      </div>

      <div className="space-y-6">
        {grouped.map(({ category, label, commands: cmds }) => (
          <div key={category}>
            <h2 className="text-xs font-medium text-[var(--color-text-dimmer)] uppercase tracking-wider mb-2">
              {label}
            </h2>
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-elevated)]">
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-[var(--color-text-dim)] w-[140px]">命令</th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-[var(--color-text-dim)]">说明</th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-[var(--color-text-dim)] w-[60px]">难度</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {cmds.map((cmd) => (
                    <tr
                      key={cmd.id}
                      className="hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
                      onClick={() => navigate(`/commands/${cmd.id}`)}
                    >
                      <td className="px-4 py-3 align-middle">
                        <span className="font-mono text-[var(--color-accent)] font-medium text-sm">{cmd.name}</span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span className="text-[var(--color-text-dim)] text-xs leading-relaxed">{cmd.summary}</span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span className={`text-xs font-medium ${getDifficultyColor(cmd.difficulty)}`}>
                          {getDifficultyLabel(cmd.difficulty)}
                        </span>
                      </td>
                      <td className="px-2 py-3 align-middle">
                        <ArrowRight size={14} className="text-[var(--color-text-dimmer)]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-[var(--color-orange)]" />
          <span className="text-sm font-medium">快速备忘</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-accent)] font-mono">/help</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">帮助</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-green)] font-mono">/compact</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">压缩</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-purple)] font-mono">/model</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">模型</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-orange)] font-mono">/doctor</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">诊断</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-red)] font-mono">/clear</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">清除</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-accent)] font-mono">/cost</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">费用</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-green)] font-mono">/review</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">审查</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-purple)] font-mono">/mcp</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">插件</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-elevated)]">
            <span className="text-[var(--color-orange)] font-mono">/agents</span>
            <ArrowRight size={10} className="text-[var(--color-text-dimmer)]" />
            <span className="text-[var(--color-text-dim)]">子代理</span>
          </div>
        </div>
      </div>
    </div>
  )
}
