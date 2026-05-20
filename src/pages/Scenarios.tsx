import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Swords, Check, AlertTriangle } from 'lucide-react'
import useProgress from '../store/useProgress'
import { useScenarios } from '../hooks/useLocalizedData'
import { useI18n } from '../i18n/context'
import { getDifficultyLabel, getDifficultyColor } from '../data/constants'
import type { PracticeState } from '../types'

type ContextType = {
  practiceState: PracticeState
  setPracticeState: React.Dispatch<React.SetStateAction<PracticeState>>
  showTerminalUser: boolean
  setShowTerminalUser: (show: boolean) => void
}

const DIFFICULTY_MAP: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
}

export default function Scenarios() {
  const { t } = useI18n()
  const scenarios = useScenarios()
  const { practiceState, setPracticeState, setShowTerminalUser } = useOutletContext<ContextType>()
  const { scenarioProgress } = useProgress()
  const [expanded, setExpanded] = useState<string | null>(null)

  const totalCompleted = Object.values(scenarioProgress).filter(s => s.completed).length

  const startScenario = (id: string) => {
    setShowTerminalUser(true)
    const progress = scenarioProgress[id]
    const steps = scenarios.find(s => s.id === id)?.steps ?? []
    const completedCount = progress?.completedSteps.length ?? 0
    const startIndex = completedCount >= steps.length ? 0 : completedCount
    setPracticeState(prev => ({
      ...prev,
      mode: 'scenario',
      currentCommandId: null,
      currentScenarioId: id,
      currentStepIndex: startIndex,
    }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t.scenarios.title}</h1>
          <p className="text-sm text-[var(--color-text-dim)] mt-1">
            {t.scenarios.desc}
          </p>
        </div>
        <div className="text-sm text-[var(--color-text-dim)]">
          {t.scenarios.progress.replace('{done}', String(totalCompleted)).replace('{total}', String(scenarios.length))}
        </div>
      </div>

      <div className="space-y-4">
        {scenarios.map((scenario) => {
          const progress = scenarioProgress[scenario.id]
          const isCompleted = progress?.completed ?? false
          const stepCount = progress?.completedSteps.length ?? 0
          const totalSteps = scenario.steps.length
          const diffLevel = DIFFICULTY_MAP[scenario.difficulty] ?? 1
          const diffColor = getDifficultyColor(diffLevel)
          const diffLabel = getDifficultyLabel(diffLevel, t.difficulty)
          const isActive = practiceState.mode === 'scenario' && practiceState.currentScenarioId === scenario.id

          return (
            <div
              key={scenario.id}
              className={`rounded-xl border transition-all duration-200 cursor-pointer p-5 ${
                isActive
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-[0_0_12px_var(--color-accent-glow)]'
                  : isCompleted
                  ? 'border-[var(--color-green)]/20 bg-[var(--color-green)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:shadow-md hover:scale-[1.01]'
              }`}
              onClick={() => {
                if (isActive) {
                  startScenario(scenario.id)
                } else {
                  setExpanded(expanded === scenario.id ? null : scenario.id)
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Swords size={18} className={
                      isCompleted
                        ? 'text-[var(--color-green)]'
                        : isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-dim)]'
                    } />
                    <h3 className="text-sm font-medium">{scenario.title}</h3>
                    {isCompleted && <Check size={16} className="text-[var(--color-green)]" />}
                  </div>
                  <p className="text-xs text-[var(--color-text-dim)] mt-1.5 line-clamp-2">
                    {scenario.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span className={diffColor}>
                    {diffLabel}
                  </span>
                  <span className="text-xs text-[var(--color-text-dim)]">{stepCount}/{totalSteps}</span>
                </div>
              </div>

              <div className="mt-3 h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCompleted
                      ? 'bg-[var(--color-green)]'
                      : 'bg-gradient-to-r from-[var(--color-accent-dim)] to-[var(--color-accent)]'
                  }`}
                  style={{ width: `${(stepCount / totalSteps) * 100}%` }}
                />
              </div>

              {expanded === scenario.id && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)] space-y-3">
                  <div className="text-xs text-[var(--color-text-dim)] leading-relaxed whitespace-pre-wrap">
                    {scenario.context}
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--color-bg-elevated)]">
                    <AlertTriangle size={14} className="text-[var(--color-orange)] mt-0.5 shrink-0" />
                    <div className="text-xs text-[var(--color-text-dim)]">
                      <span className="font-medium text-[var(--color-text)]">{t.scenarios.hint}</span>
                      {scenario.hints[0]}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); startScenario(scenario.id) }}
                    className="w-full py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-text-on-accent)] text-sm font-medium hover:bg-[var(--color-accent-dim)] transition-colors"
                  >
                    {isCompleted ? t.scenarios.restart : t.scenarios.start}
                  </button>
                </div>
              )}

              {isActive && (
                <button
                  onClick={(e) => { e.stopPropagation(); startScenario(scenario.id) }}
                  className="mt-3 w-full py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-text-on-accent)] text-sm font-medium hover:bg-[var(--color-accent-dim)] transition-colors"
                >
                  {t.scenarios.continue}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
