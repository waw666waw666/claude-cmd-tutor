import { useNavigate } from 'react-router-dom'
import { GitBranch, Boxes, Lightbulb } from 'lucide-react'
import { useCommands } from '../hooks/useLocalizedData'
import type { Translations } from '../i18n/zh'
import { useI18n } from '../i18n/context'

const relationGroups: { id: string; key: keyof Translations['reference']['relationGroups']; commands: string[]; colors: string[] }[] = [
  { id: 'context', key: 'context', commands: ['/compact', '/clear', '/context'], colors: ['var(--color-green)', 'var(--color-red)', 'var(--color-accent)'] },
  { id: 'diagnose', key: 'diagnose', commands: ['/doctor', '/cost', '/stats', '/debug'], colors: ['var(--color-orange)', 'var(--color-accent)', 'var(--color-purple)', 'var(--color-green)'] },
  { id: 'code', key: 'code', commands: ['/diff', '/review', '/copy', '/simplify'], colors: ['var(--color-purple)', 'var(--color-green)', 'var(--color-accent)', 'var(--color-coral)'] },
  { id: 'model', key: 'model', commands: ['/model', '/models'], colors: ['var(--color-purple)', 'var(--color-orange)'] },
  { id: 'extend', key: 'extend', commands: ['/mcp', '/agents', 'claude'], colors: ['var(--color-orange)', 'var(--color-green)', 'var(--color-accent)'] },
  { id: 'search', key: 'search', commands: ['/search', '/summarize'], colors: ['var(--color-coral)', 'var(--color-purple)'] },
  { id: 'session', key: 'session', commands: ['/help', '/init', '/exit'], colors: ['var(--color-green)', 'var(--color-accent)', 'var(--color-red)'] },
  { id: 'project', key: 'project', commands: ['/config', '/theme', '/color', '/rename'], colors: ['var(--color-purple)', 'var(--color-orange)', 'var(--color-green)', 'var(--color-accent)'] },
  { id: 'automate', key: 'automate', commands: ['/plan', '/background', '/batch', '/loop'], colors: ['var(--color-accent)', 'var(--color-green)', 'var(--color-purple)', 'var(--color-orange)'] },
  { id: 'security', key: 'security', commands: ['/permissions', '/fewer-permission-prompts', '/security-review'], colors: ['var(--color-red)', 'var(--color-orange)', 'var(--color-purple)'] },
  { id: 'assist', key: 'assist', commands: ['/btw', '/buddy', '/effort', '/voice'], colors: ['var(--color-green)', 'var(--color-accent)', 'var(--color-purple)', 'var(--color-orange)'] },
  { id: 'files', key: 'files', commands: ['/add-dir', '/teleport', '/export', '/branch'], colors: ['var(--color-coral)', 'var(--color-purple)', 'var(--color-green)', 'var(--color-accent)'] },
]

const workflows = [
  { cmds: ['/doctor', '/cost', '/compact'], key: 'daily' },
  { cmds: ['/diff', '/review', '/copy'], key: 'review' },
  { cmds: ['/cost', '/stats', '/compact'], key: 'costCtrl' },
  { cmds: ['/context', '/compact', '/context'], key: 'contextFlow' },
  { cmds: ['/search', '/summarize'], key: 'search' },
  { cmds: ['/model', '/models'], key: 'model' },
  { cmds: ['/permissions', '/security-review'], key: 'security' },
  { cmds: ['/plan', '/background', '/batch'], key: 'batch' },
  { cmds: ['/doctor', '/debug', '/stats'], key: 'debugFlow' },
  { cmds: ['/btw', '/buddy', '/effort'], key: 'assist' },
  { cmds: ['/agents', '/mcp'], key: 'agentMgmt' },
  { cmds: ['/copy', '/export'], key: 'exportFlow' },
] as const

const practices = [
  { key: 'firstEntry', cmds: ['/init', '/config'] },
  { key: 'modularSearch', cmds: ['/search', '/summarize'] },
  { key: 'contextMgmt', cmds: ['/compact', '/clear'] },
  { key: 'largeSearch', cmds: ['/agents', '/search'] },
  { key: 'skillFlow', cmds: ['/plan', '/background', '/batch'] },
  { key: 'codeReview', cmds: ['/diff', '/review'] },
  { key: 'faultDiag', cmds: ['/doctor', '/debug'] },
  { key: 'costMonitor', cmds: ['/cost', '/stats'] },
  { key: 'securityMgmt', cmds: ['/permissions', '/security-review'] },
  { key: 'pluginMgmt', cmds: ['/mcp', '/agents'] },
]

function CmdChip({ name, cmd, color, onClick }: { name: string; cmd: { id: string; name: string; summary: string; difficulty: number } | undefined; color: string; onClick: () => void }) {
  return (
    <div className="relative group">
      <span
        onClick={onClick}
        className="inline-flex items-center gap-1 font-mono text-xs cursor-pointer hover:opacity-70 transition-opacity"
        style={{ color }}
      >
        {cmd && (
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 inline-block"
            style={{ backgroundColor: cmd.difficulty <= 1 ? 'var(--color-green)' : cmd.difficulty <= 3 ? 'var(--color-orange)' : 'var(--color-red)' }}
          />
        )}
        <span>{name}</span>
      </span>
      {cmd && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 whitespace-normal">
          <div className="font-mono text-xs font-medium text-[var(--color-text)] mb-0.5">{cmd.name}</div>
          <div className="text-[10px] text-[var(--color-text-dim)] leading-relaxed">{cmd.summary}</div>
        </div>
      )}
    </div>
  )
}

export default function Reference() {
  const { t } = useI18n()
  const commands = useCommands()
  const navigate = useNavigate()

  const findCmd = (name: string) => commands.find(c => c.name === name)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t.reference.title}</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">{t.reference.desc}</p>
        </div>
      </div>

      {/* 命令关系 */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch size={16} className="text-[var(--color-accent)]" />
          <span className="text-sm font-medium">{t.reference.relations}</span>
        </div>
        <p className="text-[10px] text-[var(--color-text-dim)] leading-relaxed mb-3">{t.reference.relationsDesc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          {relationGroups.map((group) => {
            const groupLabel = t.reference.relationGroups[group.key] as string
            return (
              <div key={group.id} className="border border-[var(--color-border)] rounded-lg p-3">
                <div className="text-xs font-medium text-[var(--color-text)] mb-2">{groupLabel}</div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {group.commands.map((name, i) => {
                    const cmd = findCmd(name)
                    return (
                      <CmdChip
                        key={name}
                        name={name}
                        cmd={cmd ?? undefined}
                        color={group.colors[i]}
                        onClick={() => cmd && navigate(`/commands/${cmd.id}`)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 实战场景 */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={16} className="text-[var(--color-green)]" />
          <span className="text-sm font-medium">{t.reference.practices}</span>
        </div>
        <p className="text-[10px] text-[var(--color-text-dim)] leading-relaxed mb-3">{t.reference.practicesDesc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {practices.map((p) => {
            const desc = (t.reference.practiceItems as Record<string, string>)[p.key + 'Desc']
            return (
              <div key={p.key} className="border border-[var(--color-border)] rounded-lg p-3">
                <div className="text-xs font-medium text-[var(--color-text)] mb-0.5">{(t.reference.practiceItems as Record<string, string>)[p.key]}</div>
                <div className="text-[10px] text-[var(--color-text-dim)] leading-relaxed mb-2">{desc}</div>
                <div className="flex flex-wrap items-center gap-1">
                  {p.cmds.map((name, i) => {
                    const cmd = findCmd(name)
                    return (
                      <div key={name} className="flex items-center gap-1">
                        {i > 0 && <span className="text-[var(--color-text-dimmer)] text-xs">→</span>}
                        <CmdChip
                          name={name}
                          cmd={cmd ?? undefined}
                          color={['var(--color-accent)', 'var(--color-green)', 'var(--color-purple)'][i]}
                          onClick={() => cmd && navigate(`/commands/${cmd.id}`)}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 工作流组合 */}
      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-4">
          <Boxes size={16} className="text-[var(--color-orange)]" />
          <span className="text-sm font-medium">{t.reference.workflow}</span>
        </div>
        <p className="text-[10px] text-[var(--color-text-dim)] leading-relaxed mb-3">{t.reference.workflowDesc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {workflows.map((wf) => (
            <div key={wf.key} className="border border-[var(--color-border)] rounded-lg p-3">
              <div className="text-xs font-medium text-[var(--color-text)] mb-2.5">{t.reference.workflows[wf.key]}</div>
              <div className="flex flex-wrap items-center gap-1">
                {wf.cmds.map((name, i) => {
                  const cmd = findCmd(name)
                  return (
                    <div key={name} className="flex items-center gap-1">
                      {i > 0 && <span className="text-[var(--color-text-dimmer)] text-xs">→</span>}
                      <CmdChip
                        name={name}
                        cmd={cmd ?? undefined}
                        color={['var(--color-accent)', 'var(--color-green)', 'var(--color-purple)'][i]}
                        onClick={() => cmd && navigate(`/commands/${cmd.id}`)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}